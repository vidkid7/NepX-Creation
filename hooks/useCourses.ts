import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

export function useCourses() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCourses = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/courses');
      const data = await response.json();

      if (data.success) {
        setError(null);
        return data.data;
      } else {
        setError(data.error || 'Failed to fetch courses');
        toast.error(data.error || 'Failed to fetch courses');
        return [];
      }
    } catch (err) {
      setError('Failed to fetch courses');
      toast.error('Failed to fetch courses');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const createCourse = async (courseData: any) => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Course created successfully');
        setError(null);
        return data.data;
      } else {
        toast.error(data.error || 'Failed to create course');
        throw new Error(data.error);
      }
    } catch (err) {
      toast.error('Failed to create course');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCourse = async (id: string, courseData: any) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/courses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Course updated successfully');
        setError(null);
        return data.data;
      } else {
        toast.error(data.error || 'Failed to update course');
        throw new Error(data.error);
      }
    } catch (err) {
      toast.error('Failed to update course');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/courses/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Course deleted successfully');
        setError(null);
        return true;
      } else {
        toast.error(data.error || 'Failed to delete course');
        throw new Error(data.error);
      }
    } catch (err) {
      toast.error('Failed to delete course');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse,
  };
}
