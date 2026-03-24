import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../../context/DataContext';
import GlassCard from '../../components/ui/GlassCard';
import NeonButton from '../../components/ui/NeonButton';
import Modal from '../../components/ui/Modal';
import Badge from '../../components/ui/Badge';
import { HiPlus, HiPencil, HiTrash, HiSpeakerphone } from 'react-icons/hi';
import './admin.css';

export default function Announcements() {
  const { getAnnouncements, addAnnouncement, updateAnnouncement, deleteAnnouncement } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', tag: 'general', image: null });

  const announcements = getAnnouncements().sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...formData, date: new Date().toISOString().split('T')[0] };
    if (editing) {
      updateAnnouncement(editing.id, data);
    } else {
      addAnnouncement(data);
    }
    setShowForm(false);
    setEditing(null);
    setFormData({ title: '', description: '', tag: 'general', image: null });
  };

  return (
    <div className="page-container">
      <motion.div className="page-header" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1>Announcements</h1>
        <p>Create and manage announcements for tenants</p>
      </motion.div>

      <div className="action-bar">
        <div className="action-bar-left">
          <Badge variant="purple">{announcements.length} Announcements</Badge>
        </div>
        <div className="action-bar-right">
          <NeonButton onClick={() => { setEditing(null); setFormData({ title: '', description: '', tag: 'general', image: null }); setShowForm(true); }}>
            <HiPlus /> New Announcement
          </NeonButton>
        </div>
      </div>

      <div className="cards-grid" style={{ maxWidth: 800 }}>
        <AnimatePresence>
          {announcements.map((a, i) => (
            <motion.div key={a.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <GlassCard className="announcement-card" hover={false}>
                <div className="announcement-tag">
                  <Badge variant={a.tag === 'urgent' ? 'danger' : 'info'}>
                    {a.tag === 'urgent' ? '🚨 Urgent' : 'ℹ️ General'}
                  </Badge>
                </div>
                <h3 className="announcement-title">{a.title}</h3>
                <p className="announcement-desc">{a.description}</p>
                <span className="announcement-date">{a.date}</span>
                <div className="announcement-actions">
                  <button className="tenant-action-btn edit" onClick={() => { setEditing(a); setFormData({ ...a }); setShowForm(true); }}>
                    <HiPencil /> Edit
                  </button>
                  <button className="tenant-action-btn delete" onClick={() => { if (confirm('Delete announcement?')) deleteAnnouncement(a.id); }}>
                    <HiTrash /> Delete
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Modal isOpen={showForm} onClose={() => { setShowForm(false); setEditing(null); }} title={editing ? 'Edit Announcement' : 'New Announcement'}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input className="form-input" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea className="form-input" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Tag</label>
            <select className="form-input" value={formData.tag} onChange={e => setFormData({ ...formData, tag: e.target.value })}>
              <option value="general">General ℹ️</option>
              <option value="urgent">Urgent 🚨</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <NeonButton variant="secondary" onClick={() => setShowForm(false)}>Cancel</NeonButton>
            <NeonButton type="submit">{editing ? 'Update' : 'Create'}</NeonButton>
          </div>
        </form>
      </Modal>
    </div>
  );
}
