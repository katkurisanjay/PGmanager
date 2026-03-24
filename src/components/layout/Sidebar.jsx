import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import {
  HiHome, HiUsers, HiOfficeBuilding, HiCreditCard,
  HiExclamationCircle, HiSpeakerphone, HiCalendar,
  HiCube, HiChartBar, HiStar, HiCog, HiLogout
} from 'react-icons/hi';
import './layout.css';

const adminLinks = [
  { to: '/admin', icon: <HiHome />, label: 'Dashboard', end: true },
  { to: '/admin/tenants', icon: <HiUsers />, label: 'Tenants' },
  { to: '/admin/rooms', icon: <HiOfficeBuilding />, label: 'Rooms & Beds' },
  { to: '/admin/payments', icon: <HiCreditCard />, label: 'Payments' },
  { to: '/admin/complaints', icon: <HiExclamationCircle />, label: 'Complaints' },
  { to: '/admin/announcements', icon: <HiSpeakerphone />, label: 'Announcements' },
  { to: '/admin/food-menu', icon: <HiCalendar />, label: 'Food Menu' },
  { to: '/admin/facilities', icon: <HiCube />, label: 'Facilities' },
  { to: '/admin/reports', icon: <HiChartBar />, label: 'Reports' },
  { to: '/admin/feedback', icon: <HiStar />, label: 'Feedback' },
  { to: '/admin/settings', icon: <HiCog />, label: 'Settings' },
];

const tenantLinks = [
  { to: '/tenant', icon: <HiHome />, label: 'Dashboard', end: true },
  { to: '/tenant/profile', icon: <HiUsers />, label: 'My Profile' },
  { to: '/tenant/payments', icon: <HiCreditCard />, label: 'Payments' },
  { to: '/tenant/complaints', icon: <HiExclamationCircle />, label: 'Complaints' },
  { to: '/tenant/announcements', icon: <HiSpeakerphone />, label: 'Announcements' },
  { to: '/tenant/food-menu', icon: <HiCalendar />, label: 'Food Menu' },
  { to: '/tenant/feedback', icon: <HiStar />, label: 'Feedback' },
];

export default function Sidebar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const links = isAdmin() ? adminLinks : tenantLinks;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.aside
      className="sidebar"
      initial={{ x: -260 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="sidebar-logo-icon">🏠</span>
          <div>
            <h1 className="sidebar-brand">PG Manager</h1>
            <span className="sidebar-role-badge">{isAdmin() ? 'Admin' : 'Tenant'}</span>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <span className="sidebar-link-icon">{link.icon}</span>
            <span className="sidebar-link-label">{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="sidebar-user-info">
            <span className="sidebar-user-name">{user?.name || 'User'}</span>
            <span className="sidebar-user-email">{user?.email || ''}</span>
          </div>
        </div>
        <button className="sidebar-logout" onClick={handleLogout}>
          <HiLogout />
          <span>Logout</span>
        </button>
      </div>
    </motion.aside>
  );
}
