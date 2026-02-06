import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

type Settings = Record<string, any>;

export function useSettings() {
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/settings');
      const data = await response.json();

      if (data.success) {
        setSettings(data.data);
        setError(null);
      } else {
        setError(data.error || 'Failed to fetch settings');
      }
    } catch (err) {
      setError('Failed to fetch settings');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const updateSetting = async (key: string, value: any) => {
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value }),
      });

      const data = await response.json();

      if (data.success) {
        setSettings({ ...settings, [key]: value });
        toast.success('Setting updated successfully');
        return data.data;
      } else {
        toast.error(data.error || 'Failed to update setting');
        throw new Error(data.error);
      }
    } catch (err) {
      toast.error('Failed to update setting');
      throw err;
    }
  };

  const updateMultipleSettings = async (updates: Record<string, any>) => {
    try {
      const promises = Object.entries(updates).map(([key, value]) =>
        fetch('/api/admin/settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key, value }),
        })
      );

      await Promise.all(promises);
      
      setSettings({ ...settings, ...updates });
      toast.success('Settings updated successfully');
    } catch (err) {
      toast.error('Failed to update settings');
      throw err;
    }
  };

  return {
    settings,
    loading,
    error,
    updateSetting,
    updateMultipleSettings,
    refetch: fetchSettings,
  };
}
