import { useState } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import GlassCard from '../../components/ui/GlassCard';
import NeonButton from '../../components/ui/NeonButton';
import { HiSave } from 'react-icons/hi';
import './admin.css';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEALS = ['breakfast', 'lunch', 'dinner'];
const MEAL_ICONS = { breakfast: '🌅', lunch: '☀️', dinner: '🌙' };

export default function FoodMenu() {
  const { getFoodMenu, updateFoodMenu } = useData();
  const [menu, setMenu] = useState(getFoodMenu());
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (day, meal, value) => {
    setMenu(prev => ({
      ...prev,
      [day]: { ...prev[day], [meal]: value }
    }));
  };

  const handleSave = () => {
    updateFoodMenu(menu);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="page-container">
      <motion.div className="page-header" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1>Weekly Food Menu</h1>
        <p>Manage the weekly meal schedule</p>
      </motion.div>

      <div className="action-bar">
        <div className="action-bar-left">
          {saved && <span style={{ color: 'var(--status-success)', fontSize: 14 }}>✓ Menu saved!</span>}
        </div>
        <div className="action-bar-right">
          {editing ? (
            <NeonButton onClick={handleSave}><HiSave /> Save Menu</NeonButton>
          ) : (
            <NeonButton variant="secondary" onClick={() => setEditing(true)}>Edit Menu</NeonButton>
          )}
        </div>
      </div>

      <div className="menu-grid">
        {DAYS.map((day, i) => (
          <motion.div key={day} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <GlassCard className="menu-day-card" hover={false}>
              <h3 className="menu-day-name">{day}</h3>
              {MEALS.map(meal => (
                <div key={meal} className="menu-meal">
                  <span className="menu-meal-icon">{MEAL_ICONS[meal]}</span>
                  <div className="menu-meal-info">
                    <span className="menu-meal-type">{meal}</span>
                    {editing ? (
                      <input
                        className="form-input"
                        style={{ marginTop: 4, padding: '8px 12px', fontSize: 13 }}
                        value={menu[day]?.[meal] || ''}
                        onChange={e => handleChange(day, meal, e.target.value)}
                      />
                    ) : (
                      <span className="menu-meal-items">{menu[day]?.[meal] || '—'}</span>
                    )}
                  </div>
                </div>
              ))}
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
