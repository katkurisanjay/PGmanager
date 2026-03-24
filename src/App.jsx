import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AppLayout from './components/layout/AppLayout';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import Login from './pages/auth/Login';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import Tenants from './pages/admin/Tenants';
import Rooms from './pages/admin/Rooms';
import AdminPayments from './pages/admin/Payments';
import AdminComplaints from './pages/admin/Complaints';
import AdminAnnouncements from './pages/admin/Announcements';
import AdminFoodMenu from './pages/admin/FoodMenu';
import AdminFacilities from './pages/admin/Facilities';
import Reports from './pages/admin/Reports';
import AdminFeedback from './pages/admin/Feedback';
import Settings from './pages/admin/Settings';

// Tenant Pages
import TenantDashboard from './pages/tenant/Dashboard';
import TenantProfile from './pages/tenant/Profile';
import TenantPayments from './pages/tenant/Payments';
import TenantComplaints from './pages/tenant/Complaints';
import TenantAnnouncements from './pages/tenant/Announcements';
import TenantFoodMenu from './pages/tenant/FoodMenu';
import TenantFeedback from './pages/tenant/Feedback';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/pg/demo-pg" replace />} />
      <Route path="/pg/:pgName" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute role="admin"><AppLayout /></ProtectedRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="tenants" element={<Tenants />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="payments" element={<AdminPayments />} />
        <Route path="complaints" element={<AdminComplaints />} />
        <Route path="announcements" element={<AdminAnnouncements />} />
        <Route path="food-menu" element={<AdminFoodMenu />} />
        <Route path="facilities" element={<AdminFacilities />} />
        <Route path="reports" element={<Reports />} />
        <Route path="feedback" element={<AdminFeedback />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Tenant Routes */}
      <Route path="/tenant" element={<ProtectedRoute role="tenant"><AppLayout /></ProtectedRoute>}>
        <Route index element={<TenantDashboard />} />
        <Route path="profile" element={<TenantProfile />} />
        <Route path="payments" element={<TenantPayments />} />
        <Route path="complaints" element={<TenantComplaints />} />
        <Route path="announcements" element={<TenantAnnouncements />} />
        <Route path="food-menu" element={<TenantFoodMenu />} />
        <Route path="feedback" element={<TenantFeedback />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
