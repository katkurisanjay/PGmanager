import { motion } from 'framer-motion';
import './ui.css';

export default function NeonButton({ children, onClick, variant = 'primary', size = 'md', fullWidth = false, type = 'button', disabled = false, className = '' }) {
  return (
    <motion.button
      type={type}
      className={`neon-btn neon-btn-${variant} neon-btn-${size} ${fullWidth ? 'neon-btn-full' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.button>
  );
}
