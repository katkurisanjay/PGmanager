import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import StatCard from '../../components/ui/StatCard';
import GlassCard from '../../components/ui/GlassCard';
import Badge from '../../components/ui/Badge';
import { HiOutlineCalendar, HiOutlineCash, HiOutlineSpeakerphone } from 'react-icons/hi';
import './tenant.css';

export default function TenantDashboard() {
  const { user } = useAuth();
  const { getAnnouncements, getPayments, getRoomById } = useData();

  const room = getRoomById(user.roomId);
  const announcements = getAnnouncements().sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
  
  // Find current month's payment status
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
  const recentPayment = getPayments()
    .filter(p => p.tenantId === user.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  
  const paymentStatus = recentPayment?.month === currentMonth ? recentPayment.status : 'due';

  return (
    <div className="page-container">
      <motion.div className="page-header" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1>Welcome back, {user?.name.split(' ')[0]} 👋</h1>
        <p>Here's what's happening at your PG</p>
      </motion.div>

      <div className="stats-grid">
        <StatCard icon={<HiOutlineCash />} label="Rent Amount" value={`₹${user.rent.toLocaleString('en-IN')}`} color="green" delay={0} />
        <StatCard icon={<HiOutlineCalendar />} label="Due Date" value={`${user.dueDate}th of month`} color="blue" delay={1} />
        <GlassCard className="stat-card" style={{ padding: 20 }} hover={false}>
          <div className="stat-card-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--status-warning)' }}>
            <HiOutlineCash />
          </div>
          <div className="stat-card-content">
            <span className="stat-card-label">Payment Status</span>
            <span className="stat-card-value" style={{ fontSize: 20 }}>
              {paymentStatus === 'verified' ? (
                <span style={{ color: 'var(--status-success)' }}>Paid ✓</span>
              ) : paymentStatus === 'pending' ? (
                <span style={{ color: 'var(--status-warning)' }}>Verifying</span>
              ) : (
                <span style={{ color: 'var(--status-danger)' }}>Due</span>
              )}
            </span>
          </div>
        </GlassCard>
      </div>

      <div className="two-col-grid" style={{ marginTop: 24 }}>
        <GlassCard>
          <h3 className="chart-title">My Room Information</h3>
          <div className="tenant-info-card">
            <div className="tic-row">
              <span className="tic-label">Room Number</span>
              <span className="tic-value">{room?.number}</span>
            </div>
            <div className="tic-row">
              <span className="tic-label">Floor</span>
              <span className="tic-value">{room?.floor}</span>
            </div>
            <div className="tic-row">
              <span className="tic-label">Room Type</span>
              <span className="tic-value">{room?.type} {room?.ac ? '(AC)' : '(Non-AC)'}</span>
            </div>
            <div className="tic-row">
              <span className="tic-label">Bed Number</span>
              <span className="tic-value">{user.bedNumber}</span>
            </div>
             <div className="tic-row">
              <span className="tic-label">Joined On</span>
              <span className="tic-value">{user.joinDate}</span>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="chart-title">
            <HiOutlineSpeakerphone style={{ color: 'var(--neon-purple)' }} /> Recent Announcements
          </h3>
          <div className="alerts-list">
            {announcements.length === 0 ? (
              <p className="no-alerts">No recent announcements</p>
            ) : (
              announcements.map((a, i) => (
                <motion.div key={a.id} className="alert-item" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                  <div className="alert-info">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="alert-title">{a.title}</span>
                      {a.tag === 'urgent' && <Badge size="sm" variant="danger">Urgent</Badge>}
                    </div>
                    <span className="alert-sub" style={{ marginTop: 4 }}>{a.description.substring(0, 60)}...</span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
