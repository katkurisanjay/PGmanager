import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../../context/DataContext';
import GlassCard from '../../components/ui/GlassCard';
import NeonButton from '../../components/ui/NeonButton';
import Modal from '../../components/ui/Modal';
import { HiPlus, HiTrash, HiWifi } from 'react-icons/hi';
import { MdLocalLaundryService, MdLocalParking, MdSecurity, MdFitnessCenter, MdAcUnit, MdBolt, MdWaterDrop, MdCleaningServices, MdRestaurant } from 'react-icons/md';
import './admin.css';

const FACILITY_ICONS = {
  wifi: <HiWifi />,
  food: <MdRestaurant />,
  ac: <MdAcUnit />,
  laundry: <MdLocalLaundryService />,
  parking: <MdLocalParking />,
  security: <MdSecurity />,
  power: <MdBolt />,
  gym: <MdFitnessCenter />,
  water: <MdWaterDrop />,
  cleaning: <MdCleaningServices />,
};

export default function Facilities() {
  const { getFacilities, addFacility, deleteFacility } = useData();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', icon: 'wifi', description: '' });

  const facilities = getFacilities();

  const handleSubmit = (e) => {
    e.preventDefault();
    addFacility(formData);
    setShowForm(false);
    setFormData({ name: '', icon: 'wifi', description: '' });
  };

  return (
    <div className="page-container">
      <motion.div className="page-header" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1>Facilities</h1>
        <p>Manage the facilities offered at your PG</p>
      </motion.div>

      <div className="action-bar">
        <div className="action-bar-right" style={{ marginLeft: 'auto' }}>
          <NeonButton onClick={() => setShowForm(true)}><HiPlus /> Add Facility</NeonButton>
        </div>
      </div>

      <div className="facility-grid">
        <AnimatePresence>
          {facilities.map((f, i) => (
            <motion.div key={f.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
              <GlassCard className="facility-card" hover>
                <div className="facility-icon">{FACILITY_ICONS[f.icon] || '🏢'}</div>
                <h3 className="facility-name">{f.name}</h3>
                <p className="facility-desc">{f.description}</p>
                <button className="tenant-action-btn delete" style={{ marginTop: 12, width: '100%' }} onClick={() => deleteFacility(f.id)}>
                  <HiTrash /> Remove
                </button>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Add Facility" size="sm">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input className="form-input" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Icon</label>
            <select className="form-input" value={formData.icon} onChange={e => setFormData({ ...formData, icon: e.target.value })}>
              {Object.keys(FACILITY_ICONS).map(k => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Description</label>
            <input className="form-input" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <NeonButton variant="secondary" onClick={() => setShowForm(false)}>Cancel</NeonButton>
            <NeonButton type="submit">Add</NeonButton>
          </div>
        </form>
      </Modal>
    </div>
  );
}
