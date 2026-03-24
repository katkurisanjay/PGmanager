import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../../context/DataContext';
import GlassCard from '../../components/ui/GlassCard';
import Badge from '../../components/ui/Badge';

export default function TenantAnnouncements() {
  const { getAnnouncements } = useData();
  const announcements = getAnnouncements().sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="page-container">
      <motion.div className="page-header" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1>Announcements</h1>
        <p>Stay updated with the latest PG news</p>
      </motion.div>

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
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {announcements.length === 0 && (
        <div className="empty-state">
          <h3>No announcements</h3>
          <p>It's quiet here. Nothing new to report.</p>
        </div>
      )}
    </div>
  );
}
