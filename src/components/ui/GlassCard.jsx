import { motion } from 'framer-motion';
import './ui.css';

export default function GlassCard({ children, className = '', hover = true, onClick, style }) {
  return (
    <motion.div
      className={`glass-card ${hover ? 'glass-card-hover' : ''} ${className}`}
      whileHover={hover ? { y: -2, scale: 1.01 } : {}}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      style={style}
    >
      {children}
    </motion.div>
  );
}
