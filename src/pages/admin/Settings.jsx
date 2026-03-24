import { useState } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import GlassCard from '../../components/ui/GlassCard';
import NeonButton from '../../components/ui/NeonButton';
import { HiSave, HiOutlineExternalLink } from 'react-icons/hi';
import './admin.css';

export default function Settings() {
  const { getPgInfo, updatePgInfo } = useData();
  const [formData, setFormData] = useState(getPgInfo());
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: uploadData
      });
      const data = await res.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, heroImage: data.url }));
        alert('Image uploaded successfully! Remember to Save Changes.');
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePgInfo(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/pg/${formData.id || 'demo-pg'}`;
    navigator.clipboard.writeText(url);
    alert('Public page link copied to clipboard!');
  };

  return (
    <div className="page-container">
      <motion.div className="page-header" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1>PG Settings</h1>
        <p>Manage your PG's public profile and configurations</p>
      </motion.div>

      <div style={{ maxWidth: 800 }}>
        <GlassCard hover={false} style={{ padding: 32 }}>
          <form onSubmit={handleSubmit}>
            <div className="settings-section">
              <h3>Public Profile</h3>
              <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 20 }}>
                This information will be displayed on your generated public landing page.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label>PG Name</label>
                  <input className="form-input" value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                </div>
                
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label>Tagline</label>
                  <input className="form-input" value={formData.tagline || ''} onChange={e => setFormData({ ...formData, tagline: e.target.value })} />
                </div>

                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label>Description</label>
                  <textarea className="form-input" value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} rows={4} />
                </div>

                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label>Full Address</label>
                  <input className="form-input" value={formData.address || ''} onChange={e => setFormData({ ...formData, address: e.target.value })} required />
                </div>

                <div className="form-group">
                  <label>Contact Phone</label>
                  <input className="form-input" value={formData.phone || ''} onChange={e => setFormData({ ...formData, phone: e.target.value })} required />
                </div>

                <div className="form-group">
                  <label>Contact Email</label>
                  <input className="form-input" type="email" value={formData.email || ''} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                </div>
              </div>
            </div>

            <div className="settings-section">
              <h3>Payment Tracking</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div className="form-group">
                  <label>UPI ID (For tenant payments)</label>
                  <input className="form-input" value={formData.upiId || ''} onChange={e => setFormData({ ...formData, upiId: e.target.value })} />
                </div>
              </div>
            </div>

            <div className="settings-section">
              <h3>Public Page Images</h3>
              <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 20 }}>
                Upload a stunning Hero Image for your landing page.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20 }}>
                <div className="form-group">
                  <label>Hero Image Update</label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="form-input" 
                    onChange={handleImageUpload} 
                    disabled={uploading}
                    style={{ padding: '10px' }}
                  />
                  {uploading && <p style={{ fontSize: 13, color: 'var(--neon-blue)', marginTop: 8 }}>Uploading to Cloud Storage...</p>}
                  {formData.heroImage && (
                    <div style={{ marginTop: 16 }}>
                      <p style={{ fontSize: 13, color: 'var(--status-success)', marginBottom: 8 }}>Current Hero Image Preview:</p>
                      <img src={formData.heroImage} alt="Hero" style={{ height: 120, borderRadius: 8, objectFit: 'cover' }} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="settings-section">
              <h3>Public Page Link</h3>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <input 
                  className="form-input" 
                  style={{ flex: 1 }} 
                  readOnly 
                  value={`${window.location.origin}/pg/${formData.id || 'demo-pg'}`} 
                />
                <NeonButton type="button" variant="secondary" onClick={handleCopyLink}>
                  Copy
                </NeonButton>
                <NeonButton type="button" variant="secondary" onClick={() => window.open(`/pg/${formData.id || 'demo-pg'}`, '_blank')}>
                  <HiOutlineExternalLink /> Open
                </NeonButton>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 32, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
              <div>
                {saved && <span style={{ color: 'var(--status-success)', fontWeight: 500 }}>Settings saved successfully!</span>}
              </div>
              <NeonButton type="submit">
                <HiSave /> Save Changes
              </NeonButton>
            </div>
          </form>
        </GlassCard>
      </div>
    </div>
  );
}
