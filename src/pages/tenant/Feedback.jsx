import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import GlassCard from '../../components/ui/GlassCard';
import NeonButton from '../../components/ui/NeonButton';
import { HiStar } from 'react-icons/hi';
import './tenant.css';

export default function TenantFeedback() {
  const { user } = useAuth();
  const { addFeedback, getFeedback } = useData();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Check if tenant has submitted feedback this month
  const currentMonth = new Date().toISOString().substring(0, 7); // YYYY-MM
  const allFeedback = getFeedback();
  const hasFeedbackThisMonth = allFeedback.some(f => 
    f.tenantId === user.id && f.date.startsWith(currentMonth)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    
    addFeedback({
      tenantId: user.id,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    });
    
    setSubmitted(true);
  };

  return (
    <div className="page-container">
      <motion.div className="page-header" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1>Provide Feedback</h1>
        <p>Help us improve your living experience</p>
      </motion.div>

      <div style={{ maxWidth: 600 }}>
        {hasFeedbackThisMonth || submitted ? (
          <GlassCard style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🙏</div>
            <h2>Thank You!</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>
              Your feedback for this month has been recorded. We appreciate your input!
            </p>
          </GlassCard>
        ) : (
          <GlassCard hover={false} style={{ padding: 32 }}>
            <form onSubmit={handleSubmit}>
              <div style={{ textAlign: 'center', marginBottom: 32 }}>
                <h3 style={{ marginBottom: 16 }}>Rate your overall experience</h3>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: 40,
                        cursor: 'pointer',
                        color: star <= (hover || rating) ? 'var(--neon-yellow)' : 'var(--text-muted)',
                        transition: 'color 0.2s ease',
                      }}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                    >
                      <HiStar />
                    </button>
                  ))}
                </div>
                <div style={{ marginTop: 8, fontSize: 13, color: 'var(--text-tertiary)', minHeight: 20 }}>
                  {rating === 1 && 'Poor'}
                  {rating === 2 && 'Fair'}
                  {rating === 3 && 'Good'}
                  {rating === 4 && 'Very Good'}
                  {rating === 5 && 'Excellent'}
                </div>
              </div>

              <div className="form-group">
                <label>Tell us more about your experience (Optional)</label>
                <textarea 
                  className="form-input" 
                  rows={5} 
                  placeholder="What do you love? What can we improve?"
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                />
              </div>

              <NeonButton type="submit" size="lg" fullWidth style={{ marginTop: 16 }}>
                Submit Feedback
              </NeonButton>
            </form>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
