import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import StatCard from '../../components/ui/StatCard';
import GlassCard from '../../components/ui/GlassCard';
import NeonButton from '../../components/ui/NeonButton';
import Badge from '../../components/ui/Badge';
import { HiOfficeBuilding, HiUsers, HiCurrencyRupee, HiExclamation, HiCheckCircle, HiClock } from 'react-icons/hi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './admin.css';

const COLORS = ['#60a5fa', '#a78bfa', '#34d399', '#f472b6', '#fb923c'];

export default function AdminDashboard() {
  const { getRooms, getTotalBeds, getOccupiedBeds, getVacantBeds, getRevenue, getPendingDues, getTenants, getComplaints, getPayments, triggerBackendSeed } = useData();

  const rooms = getRooms();
  const tenants = getTenants();
  const complaints = getComplaints();
  const payments = getPayments();

  const occupancyData = [
    { name: 'Occupied', value: getOccupiedBeds() },
    { name: 'Vacant', value: getVacantBeds() },
  ];

  const revenueData = [
    { month: 'Oct', amount: 32000 },
    { month: 'Nov', amount: 38000 },
    { month: 'Dec', amount: 35000 },
    { month: 'Jan', amount: 42000 },
    { month: 'Feb', amount: 39500 },
    { month: 'Mar', amount: getRevenue() > 0 ? Math.round(getRevenue() * 0.6) : 25000 },
  ];

  const pendingComplaints = complaints.filter(c => c.status !== 'resolved');
  const pendingPayments = payments.filter(p => p.status === 'pending');

  return (
    <div className="page-container">
      <motion.div className="page-header" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>Dashboard</h1>
            <p>Overview of your PG management</p>
          </div>
          {rooms.length === 0 && (
            <NeonButton onClick={() => triggerBackendSeed()} variant="primary">
              Seed Database
            </NeonButton>
          )}
        </div>
      </motion.div>

      <div className="stats-grid">
        <StatCard icon={<HiOfficeBuilding />} label="Total Rooms" value={rooms.length} color="blue" delay={0} />
        <StatCard icon={<HiUsers />} label="Occupied Beds" value={getOccupiedBeds()} color="purple" delay={1} />
        <StatCard icon={<HiCheckCircle />} label="Vacant Beds" value={getVacantBeds()} color="green" delay={2} />
        <StatCard icon={<HiCurrencyRupee />} label="Revenue" value={getRevenue()} color="gold" delay={3} />
        <StatCard icon={<HiExclamation />} label="Pending Dues" value={getPendingDues()} color="orange" delay={4} />
      </div>

      <div className="two-col-grid dashboard-charts">
        <GlassCard>
          <h3 className="chart-title">Revenue Trend</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="#6b6b80" fontSize={12} />
                <YAxis stroke="#6b6b80" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(26, 26, 46, 0.95)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="amount" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#667eea" />
                    <stop offset="100%" stopColor="#764ba2" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="chart-title">Occupancy</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={occupancyData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                  {occupancyData.map((entry, index) => (
                    <Cell key={index} fill={index === 0 ? '#667eea' : '#2a2a3e'} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: 'rgba(26, 26, 46, 0.95)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="occupancy-legend">
              <div className="legend-item">
                <span className="legend-dot" style={{ background: '#667eea' }} />
                <span>Occupied ({getOccupiedBeds()})</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot" style={{ background: '#2a2a3e' }} />
                <span>Vacant ({getVacantBeds()})</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="two-col-grid" style={{ marginTop: 24 }}>
        <GlassCard>
          <h3 className="chart-title">
            <HiExclamation style={{ color: 'var(--status-warning)' }} /> Pending Complaints
          </h3>
          <div className="alerts-list">
            {pendingComplaints.length === 0 ? (
              <p className="no-alerts">No pending complaints 🎉</p>
            ) : (
              pendingComplaints.map(c => {
                const tenant = getTenants().find(t => t.id === c.tenantId);
                return (
                  <div key={c.id} className="alert-item">
                    <Badge variant={c.status === 'pending' ? 'warning' : 'info'}>{c.status}</Badge>
                    <div className="alert-info">
                      <span className="alert-title">{c.title}</span>
                      <span className="alert-sub">by {tenant?.name || 'Unknown'} • {c.date}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="chart-title">
            <HiClock style={{ color: 'var(--status-warning)' }} /> Pending Payments
          </h3>
          <div className="alerts-list">
            {pendingPayments.length === 0 ? (
              <p className="no-alerts">All payments are verified 🎉</p>
            ) : (
              pendingPayments.map(p => {
                const tenant = getTenants().find(t => t.id === p.tenantId);
                return (
                  <div key={p.id} className="alert-item">
                    <Badge variant="warning">Pending</Badge>
                    <div className="alert-info">
                      <span className="alert-title">₹{p.amount.toLocaleString('en-IN')} — {p.month}</span>
                      <span className="alert-sub">by {tenant?.name || 'Unknown'}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
