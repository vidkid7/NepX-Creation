import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

type User = {
  id: string;
  email: string;
  name?: string | null;
  role: 'ADMIN' | 'EDITOR';
  createdAt: string;
  updatedAt: string;
};

type UserInput = {
  email: string;
  password: string;
  name?: string | null;
  role: 'ADMIN' | 'EDITOR';
};

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/users');
      const data = await response.json();

      if (data.success) {
        setUsers(data.data);
        setError(null);
      } else {
        setError(data.error || 'Failed to fetch users');
        toast.error(data.error || 'Failed to fetch users');
      }
    } catch (err) {
      setError('Failed to fetch users');
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const createUser = async (userData: UserInput) => {
    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.success) {
        setUsers([...users, data.data]);
        toast.success('User created successfully');
        return data.data;
      } else {
        toast.error(data.error || 'Failed to create user');
        throw new Error(data.error);
      }
    } catch (err) {
      toast.error('Failed to create user');
      throw err;
    }
  };

  const updateUser = async (id: string, userData: Partial<UserInput>) => {
    try {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.success) {
        setUsers(users.map((u) => (u.id === id ? data.data : u)));
        toast.success('User updated successfully');
        return data.data;
      } else {
        toast.error(data.error || 'Failed to update user');
        throw new Error(data.error);
      }
    } catch (err) {
      toast.error('Failed to update user');
      throw err;
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setUsers(users.filter((u) => u.id !== id));
        toast.success('User deleted successfully');
      } else {
        toast.error(data.error || 'Failed to delete user');
        throw new Error(data.error);
      }
    } catch (err) {
      toast.error('Failed to delete user');
      throw err;
    }
  };

  return {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
    refetch: fetchUsers,
  };
}
