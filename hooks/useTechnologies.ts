import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

type Technology = {
  id: string;
  name: string;
  category: string;
  icon: string;
  expertise: number;
  color: string;
  active: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
};

type TechnologyInput = Omit<Technology, 'id' | 'createdAt' | 'updatedAt' | 'order'> & {
  order?: number;
};

export function useTechnologies() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTechnologies = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/technologies');
      const data = await response.json();

      if (data.success) {
        setTechnologies(data.data);
        setError(null);
      } else {
        setError(data.error || 'Failed to fetch technologies');
        toast.error(data.error || 'Failed to fetch technologies');
      }
    } catch (err) {
      setError('Failed to fetch technologies');
      toast.error('Failed to fetch technologies');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTechnologies();
  }, [fetchTechnologies]);

  const createTechnology = async (technologyData: TechnologyInput) => {
    try {
      const response = await fetch('/api/admin/technologies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(technologyData),
      });

      const data = await response.json();

      if (data.success) {
        setTechnologies([...technologies, data.data]);
        toast.success('Technology created successfully');
        return data.data;
      } else {
        toast.error(data.error || 'Failed to create technology');
        throw new Error(data.error);
      }
    } catch (err) {
      toast.error('Failed to create technology');
      throw err;
    }
  };

  const updateTechnology = async (id: string, technologyData: Partial<TechnologyInput>) => {
    try {
      const response = await fetch(`/api/admin/technologies/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(technologyData),
      });

      const data = await response.json();

      if (data.success) {
        setTechnologies(technologies.map((t) => (t.id === id ? data.data : t)));
        toast.success('Technology updated successfully');
        return data.data;
      } else {
        toast.error(data.error || 'Failed to update technology');
        throw new Error(data.error);
      }
    } catch (err) {
      toast.error('Failed to update technology');
      throw err;
    }
  };

  const deleteTechnology = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/technologies/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setTechnologies(technologies.filter((t) => t.id !== id));
        toast.success('Technology deleted successfully');
      } else {
        toast.error(data.error || 'Failed to delete technology');
        throw new Error(data.error);
      }
    } catch (err) {
      toast.error('Failed to delete technology');
      throw err;
    }
  };

  return {
    technologies,
    loading,
    error,
    createTechnology,
    updateTechnology,
    deleteTechnology,
    refetch: fetchTechnologies,
  };
}
