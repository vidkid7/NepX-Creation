import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  link?: string | null;
  github?: string | null;
  featured: boolean;
  active: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
};

type ProjectInput = Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'order'> & {
  order?: number;
};

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/projects');
      const data = await response.json();

      if (data.success) {
        setProjects(data.data);
        setError(null);
      } else {
        setError(data.error || 'Failed to fetch projects');
        toast.error(data.error || 'Failed to fetch projects');
      }
    } catch (err) {
      setError('Failed to fetch projects');
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const createProject = async (projectData: ProjectInput) => {
    try {
      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();

      if (data.success) {
        setProjects([...projects, data.data]);
        toast.success('Project created successfully');
        return data.data;
      } else {
        toast.error(data.error || 'Failed to create project');
        throw new Error(data.error);
      }
    } catch (err) {
      toast.error('Failed to create project');
      throw err;
    }
  };

  const updateProject = async (id: string, projectData: Partial<ProjectInput>) => {
    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();

      if (data.success) {
        setProjects(projects.map((p) => (p.id === id ? data.data : p)));
        toast.success('Project updated successfully');
        return data.data;
      } else {
        toast.error(data.error || 'Failed to update project');
        throw new Error(data.error);
      }
    } catch (err) {
      toast.error('Failed to update project');
      throw err;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setProjects(projects.filter((p) => p.id !== id));
        toast.success('Project deleted successfully');
      } else {
        toast.error(data.error || 'Failed to delete project');
        throw new Error(data.error);
      }
    } catch (err) {
      toast.error('Failed to delete project');
      throw err;
    }
  };

  return {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject,
    refetch: fetchProjects,
  };
}
