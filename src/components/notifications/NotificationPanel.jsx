import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '../../context/NotificationContext';
import { HiX, HiCheckCircle, HiExclamation, HiInformationCircle, HiBell } from 'react-icons/hi';
import './notifications.css';

const severityIcons = {
  success: <HiCheckCircle />,
  warning: <HiExclamation />,
  danger: <HiBell />,
  info: <HiInformationCircle />,
};

export default function NotificationPanel() {
  const { notifications, showPanel, setShowPanel, markAsRead, markAllAsRead, clearNotification } = useNotifications();

  return (
    <AnimatePresence>
      {showPanel && (
        <>
          <motion.div
            className="notification-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPanel(false)}
          />
          <motion.div
            className="notification-panel"
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <div className="notification-panel-header">
              <h3>Notifications</h3>
              <div className="notification-panel-actions">
                <button onClick={markAllAsRead} className="notification-mark-all">Mark all read</button>
                <button onClick={() => setShowPanel(false)} className="notification-close">
                  <HiX size={18} />
                </button>
              </div>
            </div>
            <div className="notification-list">
              {notifications.length === 0 ? (
                <div className="notification-empty">
                  <HiBell size={32} />
                  <p>No notifications yet</p>
                </div>
              ) : (
                notifications.map(n => (
                  <motion.div
                    key={n.id}
                    className={`notification-item ${n.read ? 'read' : 'unread'} severity-${n.severity || 'info'}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    layout
                  >
                    <div className={`notification-icon severity-${n.severity || 'info'}`}>
                      {severityIcons[n.severity] || severityIcons.info}
                    </div>
                    <div className="notification-content" onClick={() => markAsRead(n.id)}>
                      <p className="notification-message">{n.message}</p>
                      <span className="notification-date">{n.date}</span>
                    </div>
                    <button className="notification-dismiss" onClick={() => clearNotification(n.id)}>
                      <HiX size={14} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
