import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  HiHome, HiCreditCard, HiExclamationCircle,
  HiSpeakerphone, HiUsers
} from 'react-icons/hi';
import './layout.css';

const adminTabs = [
  { to: '/admin', icon: <HiHome />, label: 'Home', end: true },
  { to: '/admin/tenants', icon: <HiUsers />, label: 'Tenants' },
  { to: '/admin/payments', icon: <HiCreditCard />, label: 'Payments' },
  { to: '/admin/complaints', icon: <HiExclamationCircle />, label: 'Issues' },
  { to: '/admin/announcements', icon: <HiSpeakerphone />, label: 'News' },
];

const tenantTabs = [
  { to: '/tenant', icon: <HiHome />, label: 'Home', end: true },
  { to: '/tenant/payments', icon: <HiCreditCard />, label: 'Payments' },
  { to: '/tenant/complaints', icon: <HiExclamationCircle />, label: 'Issues' },
  { to: '/tenant/announcements', icon: <HiSpeakerphone />, label: 'News' },
  { to: '/tenant/profile', icon: <HiUsers />, label: 'Profile' },
];

export default function BottomNav() {
  const { isAdmin } = useAuth();
  const tabs = isAdmin() ? adminTabs : tenantTabs;

  return (
    <nav className="bottom-nav">
      {tabs.map(tab => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
        >
          <span className="bottom-nav-icon">{tab.icon}</span>
          <span className="bottom-nav-label">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
