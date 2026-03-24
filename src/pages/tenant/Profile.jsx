import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import GlassCard from '../../components/ui/GlassCard';
import './tenant.css';

export default function Profile() {
  const { user } = useAuth();
  const { getRoomById } = useData();
  const room = getRoomById(user.roomId);

  return (
    <div className="page-container">
      <motion.div className="page-header" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1>My Profile</h1>
        <p>Your personal information</p>
      </motion.div>

      <div style={{ maxWidth: 800 }}>
        <GlassCard hover={false} style={{ padding: 32 }}>
          <div className="profile-header">
            <div className="profile-avatar">{user.name.charAt(0)}</div>
            <div>
              <h2 className="profile-name">{user.name}</h2>
              <p className="profile-role">Tenant (Room {room?.number})</p>
            </div>
          </div>

          <div className="settings-section" style={{ marginTop: 32 }}>
            <h3>Personal Details</h3>
            <div className="tenant-info-card">
              <div className="tic-row">
                <span className="tic-label">Email</span>
                <span className="tic-value">{user.email}</span>
              </div>
              <div className="tic-row">
                <span className="tic-label">Phone</span>
                <span className="tic-value">{user.phone}</span>
              </div>
              <div className="tic-row">
                <span className="tic-label">Aadhaar / ID Card</span>
                <span className="tic-value">{user.aadhaar || 'Not provided'}</span>
              </div>
               <div className="tic-row">
                <span className="tic-label">Home Address</span>
                <span className="tic-value">{user.address || 'Not provided'}</span>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <h3>Guardian / Emergency Contact</h3>
             <div className="tenant-info-card">
              <div className="tic-row">
                <span className="tic-label">Guardian Name</span>
                <span className="tic-value">{user.guardianName || 'Not provided'}</span>
              </div>
              <div className="tic-row">
                <span className="tic-label">Guardian Phone</span>
                <span className="tic-value">{user.guardianPhone || 'Not provided'}</span>
              </div>
            </div>
          </div>

        </GlassCard>
      </div>
    </div>
  );
}
