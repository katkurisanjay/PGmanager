import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import GlassCard from '../../components/ui/GlassCard';
import NeonButton from '../../components/ui/NeonButton';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import { HiPlus } from 'react-icons/hi';
import './tenant.css';

export default function TenantComplaints() {
  const { user } = useAuth();
  const { getComplaints, addComplaint } = useData();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', image: null });
  const [submitting, setSubmitting] = useState(false);

  const complaints = getComplaints()
    .filter(c => c.tenantId === user.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    let imageUrl = null;

    if (formData.image) {
      const uploadData = new FormData();
      uploadData.append('file', formData.image);
      try {
        const res = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          body: uploadData
        });
        const uploadRes = await res.json();
        if (uploadRes.success) {
          imageUrl = uploadRes.url;
        }
      } catch (err) {
        console.error("Upload failed", err);
        alert('Image upload failed, but complaint will still be created.');
      }
    }

    await addComplaint({
      title: formData.title,
      description: formData.description,
      tenantId: user.id,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      imageUrl: imageUrl
    });
    
    setSubmitting(false);
    setShowForm(false);
    setFormData({ title: '', description: '', image: null });
  };

  return (
    <div className="page-container">
      <motion.div className="page-header" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1>My Complaints</h1>
        <p>Raise issues and track their resolution status</p>
      </motion.div>

      <div className="action-bar">
        <div className="action-bar-left">
          <Badge variant="warning">{complaints.filter(c => c.status !== 'resolved').length} Active Issues</Badge>
        </div>
        <div className="action-bar-right">
          <NeonButton onClick={() => setShowForm(true)}>
            <HiPlus /> Raise Complaint
          </NeonButton>
        </div>
      </div>

      <div className="cards-grid">
        <AnimatePresence>
          {complaints.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <GlassCard className="complaint-card" hover={false}>
                <div className="complaint-header">
                  <span className="complaint-title">{c.title}</span>
                  <Badge variant={c.status === 'resolved' ? 'success' : c.status === 'in-progress' ? 'info' : 'warning'}>
                    {c.status}
                  </Badge>
                </div>
                <p className="complaint-desc">{c.description}</p>
                <div className="complaint-meta">
                  <span>{c.date}</span>
                  {c.status === 'resolved' && <span style={{ color: 'var(--status-success)' }}>Resolved ✓</span>}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {complaints.length === 0 && (
        <div className="empty-state">
          <h3>No complaints</h3>
          <p>You haven't raised any issues yet.</p>
        </div>
      )}

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Raise New Complaint">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Issue Title</label>
            <input className="form-input" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. AC not cooling" required />
          </div>
          <div className="form-group">
            <label>Detailed Description</label>
            <textarea className="form-input" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Describe the issue in detail..." required />
          </div>
          <div className="form-group">
            <label>Upload Photo (Optional)</label>
            <input 
              type="file" 
              accept="image/*" 
              style={{ fontSize: 13, color: 'var(--text-secondary)' }} 
              onChange={e => setFormData({ ...formData, image: e.target.files[0] })}
            />
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 24 }}>
            <NeonButton variant="secondary" onClick={() => setShowForm(false)} disabled={submitting}>Cancel</NeonButton>
            <NeonButton type="submit" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Complaint'}
            </NeonButton>
          </div>
        </form>
      </Modal>
    </div>
  );
}
