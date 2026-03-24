import { useState } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import GlassCard from '../../components/ui/GlassCard';
import Badge from '../../components/ui/Badge';
import SearchBar from '../../components/ui/SearchBar';
import './admin.css';

export default function Complaints() {
  const { getComplaints, updateComplaint, getTenantById } = useData();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const complaints = getComplaints()
    .filter(c => {
      const tenant = getTenantById(c.tenantId);
      const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || tenant?.name?.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === 'all' || c.status === filter;
      return matchSearch && matchFilter;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleStatusChange = (id, status) => updateComplaint(id, { status });

  return (
    <div className="page-container">
      <motion.div className="page-header" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1>Complaint Management</h1>
        <p>Track and resolve tenant complaints</p>
      </motion.div>

      <div className="action-bar">
        <div className="action-bar-left">
          <SearchBar placeholder="Search complaints..." value={search} onChange={setSearch} />
        </div>
        <div className="action-bar-right">
          <div className="filter-chips">
            {['all', 'pending', 'in-progress', 'resolved'].map(f => (
              <button key={f} className={`filter-chip ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                {f === 'in-progress' ? 'In Progress' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="cards-grid">
        {complaints.map((complaint, i) => {
          const tenant = getTenantById(complaint.tenantId);
          return (
            <motion.div key={complaint.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <GlassCard className="complaint-card" hover={false}>
                <div className="complaint-header">
                  <span className="complaint-title">{complaint.title}</span>
                  <Badge variant={complaint.status === 'resolved' ? 'success' : complaint.status === 'in-progress' ? 'info' : 'warning'}>
                    {complaint.status}
                  </Badge>
                </div>
                <p className="complaint-desc">{complaint.description}</p>
                <div className="complaint-meta">
                  <span>By {tenant?.name || 'Unknown'}</span>
                  <span>{complaint.date}</span>
                </div>
                <div className="complaint-actions">
                  {['pending', 'in-progress', 'resolved'].map(s => (
                    <button
                      key={s}
                      className={`status-btn ${complaint.status === s ? 'active-status' : ''}`}
                      onClick={() => handleStatusChange(complaint.id, s)}
                    >
                      {s === 'in-progress' ? 'In Progress' : s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {complaints.length === 0 && (
        <div className="empty-state">
          <h3>No complaints</h3>
          <p>All quiet — no complaints to show</p>
        </div>
      )}
    </div>
  );
}
