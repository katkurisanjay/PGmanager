import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { HiBell, HiMenu } from 'react-icons/hi';
import './layout.css';

export default function TopBar({ onMenuToggle }) {
  const { user } = useAuth();
  const { unreadCount, togglePanel } = useNotifications();

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="topbar-menu-btn" onClick={onMenuToggle}>
          <HiMenu size={22} />
        </button>
        <div className="topbar-greeting">
          <span className="topbar-hello">Welcome back,</span>
          <span className="topbar-name">{user?.name || 'User'}</span>
        </div>
      </div>
      <div className="topbar-right">
        <button className="topbar-notification-btn" onClick={togglePanel}>
          <HiBell size={20} />
          {unreadCount > 0 && (
            <span className="topbar-notification-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>
          )}
        </button>
        <div className="topbar-avatar">
          {user?.name?.charAt(0) || 'U'}
        </div>
      </div>
    </header>
  );
}
