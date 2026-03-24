import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../../context/DataContext';
import GlassCard from '../../components/ui/GlassCard';
import NeonButton from '../../components/ui/NeonButton';
import Modal from '../../components/ui/Modal';
import Badge from '../../components/ui/Badge';
import { HiPlus, HiPencil, HiTrash } from 'react-icons/hi';
import './admin.css';

export default function Rooms() {
  const { getRooms, addRoom, updateRoom, deleteRoom, getTenants } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({ number: '', floor: 1, type: 'Double', totalBeds: 2, rent: '', ac: false });

  const rooms = getRooms();
  const tenants = getTenants();

  const getBedsStatus = (room) => {
    const roomTenants = tenants.filter(t => t.roomId === room.id);
    const beds = [];
    for (let i = 1; i <= room.totalBeds; i++) {
      const occupant = roomTenants.find(t => t.bedNumber === i);
      beds.push({ number: i, occupied: !!occupant, tenant: occupant });
    }
    return beds;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...formData, floor: Number(formData.floor), totalBeds: Number(formData.totalBeds), rent: Number(formData.rent) };
    if (editingRoom) {
      updateRoom(editingRoom.id, data);
    } else {
      addRoom(data);
    }
    setShowForm(false);
    setEditingRoom(null);
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setFormData({ ...room });
    setShowForm(true);
  };

  return (
    <div className="page-container">
      <motion.div className="page-header" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1>Room & Bed Management</h1>
        <p>Manage rooms and track bed availability</p>
      </motion.div>

      <div className="action-bar">
        <div className="action-bar-left">
          <Badge variant="info">{rooms.length} Rooms</Badge>
        </div>
        <div className="action-bar-right">
          <NeonButton onClick={() => { setFormData({ number: '', floor: 1, type: 'Double', totalBeds: 2, rent: '', ac: false }); setEditingRoom(null); setShowForm(true); }}>
            <HiPlus /> Add Room
          </NeonButton>
        </div>
      </div>

      <div className="cards-grid">
        <AnimatePresence>
          {rooms.map((room, i) => {
            const beds = getBedsStatus(room);
            const occupiedCount = beds.filter(b => b.occupied).length;
            return (
              <motion.div key={room.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <GlassCard className="room-card" hover={false}>
                  <div className="room-header">
                    <div>
                      <div className="room-number">Room {room.number}</div>
                      <div className="room-type">Floor {room.floor} • {room.type} {room.ac ? '❄️' : ''}</div>
                    </div>
                    <Badge variant={occupiedCount === room.totalBeds ? 'danger' : occupiedCount > 0 ? 'warning' : 'success'}>
                      {occupiedCount}/{room.totalBeds} Beds
                    </Badge>
                  </div>
                  <div className="room-beds">
                    {beds.map(bed => (
                      <div key={bed.number} className={`bed-indicator ${bed.occupied ? 'occupied' : 'vacant'}`} title={bed.tenant?.name || 'Vacant'}>
                        B{bed.number}
                      </div>
                    ))}
                  </div>
                  <div className="room-footer">
                    <div className="room-rent">₹{room.rent?.toLocaleString('en-IN')} <span>/bed/month</span></div>
                    <div className="room-actions">
                      <button className="tenant-action-btn edit" onClick={() => handleEdit(room)}><HiPencil /></button>
                      <button className="tenant-action-btn delete" onClick={() => { if (confirm('Delete this room?')) deleteRoom(room.id); }}><HiTrash /></button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <Modal isOpen={showForm} onClose={() => { setShowForm(false); setEditingRoom(null); }} title={editingRoom ? 'Edit Room' : 'Add New Room'}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Room Number</label>
            <input className="form-input" value={formData.number} onChange={e => setFormData({ ...formData, number: e.target.value })} required />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="form-group">
              <label>Floor</label>
              <input className="form-input" type="number" min="1" value={formData.floor} onChange={e => setFormData({ ...formData, floor: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Room Type</label>
              <select className="form-input" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Triple">Triple</option>
                <option value="Quad">Quad</option>
              </select>
            </div>
            <div className="form-group">
              <label>Total Beds</label>
              <input className="form-input" type="number" min="1" max="8" value={formData.totalBeds} onChange={e => setFormData({ ...formData, totalBeds: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Rent per Bed</label>
              <input className="form-input" type="number" value={formData.rent} onChange={e => setFormData({ ...formData, rent: e.target.value })} required />
            </div>
          </div>
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" checked={formData.ac} onChange={e => setFormData({ ...formData, ac: e.target.checked })} />
              Air Conditioned (AC)
            </label>
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <NeonButton variant="secondary" onClick={() => setShowForm(false)}>Cancel</NeonButton>
            <NeonButton type="submit">{editingRoom ? 'Update' : 'Add'} Room</NeonButton>
          </div>
        </form>
      </Modal>
    </div>
  );
}
