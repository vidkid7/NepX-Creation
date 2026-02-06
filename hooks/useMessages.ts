import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = useCallback(async (read?: boolean) => {
    try {
      setLoading(true);
      const url = read !== undefined ? `/api/admin/messages?read=${read}` : '/api/admin/messages';
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setMessages(data.data);
        setError(null);
      } else {
        setError(data.error || 'Failed to fetch messages');
        toast.error(data.error || 'Failed to fetch messages');
      }
    } catch (err) {
      setError('Failed to fetch messages');
      toast.error('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: true }),
      });

      const data = await response.json();

      if (data.success) {
        setMessages(messages.map((m) => (m.id === id ? { ...m, read: true } : m)));
      } else {
        toast.error(data.error || 'Failed to mark message as read');
        throw new Error(data.error);
      }
    } catch (err) {
      toast.error('Failed to mark message as read');
      throw err;
    }
  };

  const markAsUnread = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: false }),
      });

      const data = await response.json();

      if (data.success) {
        setMessages(messages.map((m) => (m.id === id ? { ...m, read: false } : m)));
        toast.success('Message marked as unread');
      } else {
        toast.error(data.error || 'Failed to mark message as unread');
        throw new Error(data.error);
      }
    } catch (err) {
      toast.error('Failed to mark message as unread');
      throw err;
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setMessages(messages.filter((m) => m.id !== id));
        toast.success('Message deleted successfully');
      } else {
        toast.error(data.error || 'Failed to delete message');
        throw new Error(data.error);
      }
    } catch (err) {
      toast.error('Failed to delete message');
      throw err;
    }
  };

  return {
    messages,
    loading,
    error,
    markAsRead,
    markAsUnread,
    deleteMessage,
    refetch: fetchMessages,
  };
}
