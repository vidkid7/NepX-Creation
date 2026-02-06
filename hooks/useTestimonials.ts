import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  image?: string | null;
  rating: number;
  active: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
};

type TestimonialInput = Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt' | 'order'> & {
  order?: number;
};

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTestimonials = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/testimonials');
      const data = await response.json();

      if (data.success) {
        setTestimonials(data.data);
        setError(null);
      } else {
        setError(data.error || 'Failed to fetch testimonials');
        toast.error(data.error || 'Failed to fetch testimonials');
      }
    } catch (err) {
      setError('Failed to fetch testimonials');
      toast.error('Failed to fetch testimonials');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const createTestimonial = async (testimonialData: TestimonialInput) => {
    try {
      const response = await fetch('/api/admin/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testimonialData),
      });

      const data = await response.json();

      if (data.success) {
        setTestimonials([...testimonials, data.data]);
        toast.success('Testimonial created successfully');
        return data.data;
      } else {
        toast.error(data.error || 'Failed to create testimonial');
        throw new Error(data.error);
      }
    } catch (err) {
      toast.error('Failed to create testimonial');
      throw err;
    }
  };

  const updateTestimonial = async (id: string, testimonialData: Partial<TestimonialInput>) => {
    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testimonialData),
      });

      const data = await response.json();

      if (data.success) {
        setTestimonials(testimonials.map((t) => (t.id === id ? data.data : t)));
        toast.success('Testimonial updated successfully');
        return data.data;
      } else {
        toast.error(data.error || 'Failed to update testimonial');
        throw new Error(data.error);
      }
    } catch (err) {
      toast.error('Failed to update testimonial');
      throw err;
    }
  };

  const deleteTestimonial = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setTestimonials(testimonials.filter((t) => t.id !== id));
        toast.success('Testimonial deleted successfully');
      } else {
        toast.error(data.error || 'Failed to delete testimonial');
        throw new Error(data.error);
      }
    } catch (err) {
      toast.error('Failed to delete testimonial');
      throw err;
    }
  };

  return {
    testimonials,
    loading,
    error,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
    refetch: fetchTestimonials,
  };
}
