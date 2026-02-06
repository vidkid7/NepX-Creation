import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

export function useContent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getContent = useCallback(async (section: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/content/${section}`);
      const data = await response.json();

      if (data.success) {
        setError(null);
        return data.data;
      } else {
        setError(data.error || 'Failed to fetch content');
        toast.error(data.error || 'Failed to fetch content');
        return null;
      }
    } catch (err) {
      setError('Failed to fetch content');
      toast.error('Failed to fetch content');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateContent = async (section: string, content: any) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/content/${section}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Content updated successfully');
        setError(null);
        return data.data;
      } else {
        toast.error(data.error || 'Failed to update content');
        throw new Error(data.error);
      }
    } catch (err) {
      toast.error('Failed to update content');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getContent,
    updateContent,
  };
}
