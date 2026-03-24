import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../../context/DataContext';
import GlassCard from '../../components/ui/GlassCard';
import { HiStar } from 'react-icons/hi';
import './admin.css';

export default function Feedback() {
  const { getFeedback, getTenantById } = useData();

  const feedbackList = getFeedback().sort((a, b) => new Date(b.date) - new Date(a.date));

  const getStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <HiStar key={i} style={{ opacity: i < rating ? 1 : 0.2 }} />
    ));
  };

  return (
    <div className="page-container">
      <motion.div className="page-header" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1>Tenant Feedback</h1>
        <p>View ratings and reviews from your tenants</p>
      </motion.div>

      <div className="cards-grid">
        <AnimatePresence>
          {feedbackList.map((feedback, i) => {
            const tenant = getTenantById(feedback.tenantId);
            return (
              <motion.div key={feedback.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <GlassCard className="feedback-card" hover={false}>
                  <div className="feedback-header">
                    <div className="feedback-stars">{getStars(feedback.rating)}</div>
                    <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{feedback.date}</span>
                  </div>
                  <p className="feedback-comment">"{feedback.comment}"</p>
                  <div className="feedback-author">— {tenant?.name || 'Unknown Tenant'} (Room {tenant?.roomId || '?'})</div>
                </GlassCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {feedbackList.length === 0 && (
        <div className="empty-state">
          <h3>No feedback yet</h3>
          <p>Tenants haven't submitted any feedback yet.</p>
        </div>
      )}
    </div>
  );
}
