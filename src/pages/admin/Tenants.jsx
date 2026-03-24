import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../../context/DataContext';
import GlassCard from '../../components/ui/GlassCard';
import NeonButton from '../../components/ui/NeonButton';
import Modal from '../../components/ui/Modal';
import Badge from '../../components/ui/Badge';
import SearchBar from '../../components/ui/SearchBar';
import { HiEye, HiPencil, HiTrash, HiPlus, HiPhone } from 'react-icons/hi';
import './admin.css';

export default function Tenants() {
  const { getTenants, addTenant, updateTenant, deleteTenant, getRoomById } = useData();
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(null);
  const [editingTenant, setEditingTenant] = useState(null);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', aadhaar: '', address: '',
    guardianName: '', guardianPhone: '', roomId: '', bedNumber: 1,
    joinDate: '', rent: '', dueDate: 5, username: '', password: '',
  });

  const tenants = getTenants().filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.phone.includes(search) ||
    getRoomById(t.roomId)?.number?.includes(search)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...formData, rent: Number(formData.rent), bedNumber: Number(formData.bedNumber), dueDate: Number(formData.dueDate) };
    if (editingTenant) {
      updateTenant(editingTenant.id, data);
    } else {
      addTenant(data);
    }
    setShowForm(false);
    setEditingTenant(null);
    resetForm();
  };

  const handleEdit = (tenant) => {
    setEditingTenant(tenant);
    setFormData({ ...tenant });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this tenant?')) {
      deleteTenant(id);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', aadhaar: '', address: '', guardianName: '', guardianPhone: '', roomId: '', bedNumber: 1, joinDate: '', rent: '', dueDate: 5, username: '', password: '' });
  };

  return (
    <div className="page-container">
      <motion.div className="page-header" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1>Tenant Management</h1>
        <p>Manage all your tenants</p>
      </motion.div>

      <div className="action-bar">
        <div className="action-bar-left">
          <SearchBar placeholder="Search by name, phone, room..." value={search} onChange={setSearch} />
        </div>
        <div className="action-bar-right">
          <NeonButton onClick={() => { resetForm(); setEditingTenant(null); setShowForm(true); }}>
            <HiPlus /> Add Tenant
          </NeonButton>
        </div>
      </div>

      <div className="cards-grid">
        <AnimatePresence>
          {tenants.map((tenant, i) => {
            const room = getRoomById(tenant.roomId);
            return (
              <motion.div key={tenant.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <GlassCard className="tenant-card" hover={false}>
                  <div className="tenant-card-header">
                    <div className="tenant-avatar">{tenant.name.charAt(0)}</div>
                    <div className="tenant-card-info">
                      <h3>{tenant.name}</h3>
                      <p>Room {room?.number || '—'} • Bed {tenant.bedNumber}</p>
                    </div>
                  </div>
                  <div className="tenant-card-details">
                    <div className="tenant-detail">
                      <span className="tenant-detail-label">Phone</span>
                      <span className="tenant-detail-value">{tenant.phone}</span>
                    </div>
                    <div className="tenant-detail">
                      <span className="tenant-detail-label">Rent</span>
                      <span className="tenant-detail-value">₹{tenant.rent?.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="tenant-detail">
                      <span className="tenant-detail-label">Due Date</span>
                      <span className="tenant-detail-value">{tenant.dueDate}th of month</span>
                    </div>
                    <div className="tenant-detail">
                      <span className="tenant-detail-label">Joined</span>
                      <span className="tenant-detail-value">{tenant.joinDate}</span>
                    </div>
                  </div>
                  <div className="tenant-card-actions">
                    <button className="tenant-action-btn view" onClick={() => setShowDetail(tenant)}>
                      <HiEye /> View
                    </button>
                    <button className="tenant-action-btn edit" onClick={() => handleEdit(tenant)}>
                      <HiPencil /> Edit
                    </button>
                    <button className="tenant-action-btn delete" onClick={() => handleDelete(tenant.id)}>
                      <HiTrash /> Delete
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {tenants.length === 0 && (
        <div className="empty-state">
          <h3>No tenants found</h3>
          <p>Add your first tenant or adjust your search</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal isOpen={showForm} onClose={() => { setShowForm(false); setEditingTenant(null); }} title={editingTenant ? 'Edit Tenant' : 'Add New Tenant'} size="lg">
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="form-group">
              <label>Full Name</label>
              <input className="form-input" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input className="form-input" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input className="form-input" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Aadhaar Number</label>
              <input className="form-input" value={formData.aadhaar} onChange={e => setFormData({ ...formData, aadhaar: e.target.value })} />
            </div>
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label>Address</label>
              <input className="form-input" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Guardian Name</label>
              <input className="form-input" value={formData.guardianName} onChange={e => setFormData({ ...formData, guardianName: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Guardian Phone</label>
              <input className="form-input" value={formData.guardianPhone} onChange={e => setFormData({ ...formData, guardianPhone: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Room ID</label>
              <input className="form-input" value={formData.roomId} onChange={e => setFormData({ ...formData, roomId: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Bed Number</label>
              <input className="form-input" type="number" min="1" value={formData.bedNumber} onChange={e => setFormData({ ...formData, bedNumber: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Join Date</label>
              <input className="form-input" type="date" value={formData.joinDate} onChange={e => setFormData({ ...formData, joinDate: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Rent Amount</label>
              <input className="form-input" type="number" value={formData.rent} onChange={e => setFormData({ ...formData, rent: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Due Date (Day of month)</label>
              <input className="form-input" type="number" min="1" max="28" value={formData.dueDate} onChange={e => setFormData({ ...formData, dueDate: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Login Username</label>
              <input className="form-input" value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Login Password</label>
              <input className="form-input" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 20, justifyContent: 'flex-end' }}>
            <NeonButton variant="secondary" onClick={() => { setShowForm(false); setEditingTenant(null); }}>Cancel</NeonButton>
            <NeonButton type="submit">{editingTenant ? 'Update' : 'Add'} Tenant</NeonButton>
          </div>
        </form>
      </Modal>

      {/* Detail Modal */}
      <Modal isOpen={!!showDetail} onClose={() => setShowDetail(null)} title="Tenant Details" size="lg">
        {showDetail && (
          <div className="tenant-detail-modal">
            <div className="tenant-detail-top">
              <div className="tenant-detail-avatar">{showDetail.name.charAt(0)}</div>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 700 }}>{showDetail.name}</h2>
                <p style={{ color: 'var(--text-tertiary)', fontSize: 14 }}>Room {getRoomById(showDetail.roomId)?.number} • Bed {showDetail.bedNumber}</p>
              </div>
            </div>
            <div className="tenant-detail-grid">
              <div className="detail-field"><label>Email</label><span>{showDetail.email}</span></div>
              <div className="detail-field"><label>Phone</label><span>{showDetail.phone}</span></div>
              <div className="detail-field"><label>Aadhaar</label><span>{showDetail.aadhaar || '—'}</span></div>
              <div className="detail-field"><label>Address</label><span>{showDetail.address || '—'}</span></div>
              <div className="detail-field"><label>Guardian</label><span>{showDetail.guardianName || '—'}</span></div>
              <div className="detail-field"><label>Guardian Phone</label><span>{showDetail.guardianPhone || '—'}</span></div>
              <div className="detail-field"><label>Rent</label><span>₹{showDetail.rent?.toLocaleString('en-IN')}</span></div>
              <div className="detail-field"><label>Due Date</label><span>{showDetail.dueDate}th of month</span></div>
              <div className="detail-field"><label>Join Date</label><span>{showDetail.joinDate}</span></div>
            </div>
            <div className="call-buttons">
              <a href={`tel:${showDetail.phone}`} className="call-btn primary"><HiPhone /> Call Tenant</a>
              {showDetail.guardianPhone && (
                <a href={`tel:${showDetail.guardianPhone}`} className="call-btn secondary"><HiPhone /> Call Guardian</a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
