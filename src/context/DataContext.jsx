import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  DEMO_PG, 
  DEMO_ROOMS, 
  DEMO_TENANTS, 
  DEMO_PAYMENTS, 
  DEMO_COMPLAINTS, 
  DEMO_ANNOUNCEMENTS, 
  DEMO_FOOD_MENU, 
  DEMO_FACILITIES, 
  DEMO_FEEDBACK,
  DEMO_NOTIFICATIONS
} from '../data/seedData';

const DataContext = createContext(null);
// const API_BASE = 'http://localhost:5000/api'; // Disabling backend API

export function DataProvider({ children }) {
  const [data, setData] = useState({
    pgInfo: DEMO_PG,
    rooms: DEMO_ROOMS,
    tenants: DEMO_TENANTS,
    payments: DEMO_PAYMENTS,
    complaints: DEMO_COMPLAINTS,
    announcements: DEMO_ANNOUNCEMENTS,
    foodMenu: DEMO_FOOD_MENU,
    facilities: DEMO_FACILITIES,
    feedback: DEMO_FEEDBACK
  });
  const [loading, setLoading] = useState(false);

  const fetchAllData = useCallback(async () => {
    // In mock mode, data is already in state
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Mock API implementation using local state
  const mockApiCall = async (method, path, body = null) => {
    // Artificial delay to simulate network
    await new Promise(resolve => setTimeout(resolve, 300));
    return body || { success: true };
  };

  // State Updaters
  const addDoc = async (stateKey, item) => {
    const newItem = { 
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: new Date().toISOString().split('T')[0],
      ...item 
    };
    setData(prev => ({ ...prev, [stateKey]: [...prev[stateKey], newItem] }));
    return newItem;
  };

  const updateDoc = async (stateKey, id, updates) => {
    setData(prev => ({ 
      ...prev, 
      [stateKey]: prev[stateKey].map(item => item.id === id ? { ...item, ...updates } : item) 
    }));
    return { success: true };
  };

  const deleteDoc = async (stateKey, id) => {
    setData(prev => ({
      ...prev,
      [stateKey]: prev[stateKey].filter(item => item.id !== id)
    }));
    return { success: true };
  };

  const updateConfig = async (stateKey, updates) => {
    setData(prev => ({ ...prev, [stateKey]: { ...prev[stateKey], ...updates } }));
    return { success: true };
  };

  // Maps
  const getPgInfo = () => data.pgInfo;
  const updatePgInfo = (updates) => updateConfig('pgInfo', updates);

  const getRooms = () => data.rooms;
  const addRoom = (room) => addDoc('rooms', room);
  const updateRoom = (id, updates) => updateDoc('rooms', id, updates);
  const deleteRoom = (id) => deleteDoc('rooms', id);
  const getRoomById = (id) => data.rooms.find(r => r.id === id);

  const getTenants = () => data.tenants;
  const addTenant = (tenant) => addDoc('tenants', tenant);
  const updateTenant = (id, updates) => updateDoc('tenants', id, updates);
  const deleteTenant = (id) => deleteDoc('tenants', id);
  const getTenantById = (id) => data.tenants.find(t => t.id === id);

  const getPayments = () => data.payments;
  const addPayment = (payment) => addDoc('payments', payment);
  const updatePayment = (id, updates) => updateDoc('payments', id, updates);

  const getComplaints = () => data.complaints;
  const addComplaint = (c) => addDoc('complaints', c);
  const updateComplaint = (id, updates) => updateDoc('complaints', id, updates);

  const getAnnouncements = () => data.announcements;
  const addAnnouncement = (a) => addDoc('announcements', a);
  const updateAnnouncement = (id, updates) => updateDoc('announcements', id, updates);
  const deleteAnnouncement = (id) => deleteDoc('announcements', id);

  const getFoodMenu = () => data.foodMenu;
  const updateFoodMenu = (menu) => updateConfig('foodMenu', menu);

  const getFacilities = () => data.facilities;
  const addFacility = (f) => addDoc('facilities', f);
  const deleteFacility = (id) => deleteDoc('facilities', id);

  const getFeedback = () => data.feedback;
  const addFeedback = (f) => addDoc('feedback', f);

  // Computed Values
  const getOccupiedBeds = () => data.tenants.length;
  const getTotalBeds = () => data.rooms.reduce((sum, r) => sum + r.totalBeds, 0);
  const getVacantBeds = () => getTotalBeds() - getOccupiedBeds();
  const getRevenue = () => data.payments.filter(p => p.status === 'verified').reduce((sum, p) => sum + p.amount, 0);
  const getPendingDues = () => data.payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);

  const triggerBackendSeed = async () => {
    // No-op in mock mode
    return;
  };

  const value = {
    loading,
    getPgInfo, updatePgInfo,
    getRooms, addRoom, updateRoom, deleteRoom, getRoomById,
    getTenants, addTenant, updateTenant, deleteTenant, getTenantById,
    getPayments, addPayment, updatePayment,
    getComplaints, addComplaint, updateComplaint,
    getAnnouncements, addAnnouncement, updateAnnouncement, deleteAnnouncement,
    getFoodMenu, updateFoodMenu,
    getFacilities, addFacility, deleteFacility,
    getFeedback, addFeedback,
    getOccupiedBeds, getTotalBeds, getVacantBeds, getRevenue, getPendingDues,
    triggerBackendSeed
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
