import { useNotifications } from '../../context/NotificationContext';
import { HiBell } from 'react-icons/hi';

export default function NotificationBell() {
  const { unreadCount, togglePanel } = useNotifications();

  return (
    <button className="topbar-notification-btn" onClick={togglePanel}>
      <HiBell size={20} />
      {unreadCount > 0 && (
        <span className="topbar-notification-badge">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  );
}
