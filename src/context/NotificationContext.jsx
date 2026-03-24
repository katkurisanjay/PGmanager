import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { DEMO_NOTIFICATIONS } from '../data/seedData';

const NotificationContext = createContext(null);
// const API_BASE = 'http://localhost:5000/api/notifications'; // Disabling backend API

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(DEMO_NOTIFICATIONS);
  const [showPanel, setShowPanel] = useState(false);

  const fetchNotifications = useCallback(async () => {
    // In mock mode, data is already in state
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = useCallback(async (notification) => {
    const n = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: new Date().toISOString().split('T')[0],
      read: false,
      ...notification,
    };
    setNotifications(prev => [n, ...prev]);
    return n;
  }, []);

  const markAsRead = useCallback(async (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const markAllAsRead = useCallback(async () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const clearNotification = useCallback(async (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const togglePanel = useCallback(() => {
    setShowPanel(prev => !prev);
  }, []);

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      showPanel,
      addNotification,
      markAsRead,
      markAllAsRead,
      clearNotification,
      togglePanel,
      setShowPanel,
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationContext);
