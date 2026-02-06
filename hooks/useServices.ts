import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  features: string[];
  active: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
};

type ServiceInput = Omit<Service, 'id' | 'createdAt' | 'updatedAt' | 'order'> & {
  order?: number;
};

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/services');
      const data = await response.json();

      if (data.success) {
        setServices(data.data);
        setError(null);
      } else {
        setError(data.error || 'Failed to fetch services');
        toast.error(data.error || 'Failed to fetch services');
      }
    } catch (err) {
      setError('Failed to fetch services');
      toast.error('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const createService = async (serviceData: ServiceInput) => {
    try {
      const response = await fetch('/api/admin/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceData),
      });

      const data = await response.json();

      if (data.success) {
        setServices([...services, data.data]);
        toast.success('Service created successfully');
        return data.data;
      } else {
        toast.error(data.error || 'Failed to create service');
        throw new Error(data.error);
      }
    } catch (err) {
      toast.error('Failed to create service');
      throw err;
    }
  };

  const updateService = async (id: string, serviceData: Partial<ServiceInput>) => {
    try {
      const response = await fetch(`/api/admin/services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceData),
      });

      const data = await response.json();

      if (data.success) {
        setServices(services.map((s) => (s.id === id ? data.data : s)));
        toast.success('Service updated successfully');
        return data.data;
      } else {
        toast.error(data.error || 'Failed to update service');
        throw new Error(data.error);
      }
    } catch (err) {
      toast.error('Failed to update service');
      throw err;
    }
  };

  const deleteService = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/services/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setServices(services.filter((s) => s.id !== id));
        toast.success('Service deleted successfully');
      } else {
        toast.error(data.error || 'Failed to delete service');
        throw new Error(data.error);
      }
    } catch (err) {
      toast.error('Failed to delete service');
      throw err;
    }
  };

  return {
    services,
    loading,
    error,
    createService,
    updateService,
    deleteService,
    refetch: fetchServices,
  };
}
