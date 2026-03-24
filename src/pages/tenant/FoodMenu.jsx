import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import GlassCard from '../../components/ui/GlassCard';
import Badge from '../../components/ui/Badge';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEALS = ['breakfast', 'lunch', 'dinner'];
const MEAL_ICONS = { breakfast: '🌅', lunch: '☀️', dinner: '🌙' };

export default function TenantFoodMenu() {
  const { getFoodMenu } = useData();
  const menu = getFoodMenu();
  const [currentDayStr, setCurrentDayStr] = useState('');

  useEffect(() => {
    const dayIndex = new Date().getDay();
    // JS getDay() returns 0 for Sunday
    const mappedIndex = dayIndex === 0 ? 6 : dayIndex - 1;
    setCurrentDayStr(DAYS[mappedIndex]);
  }, []);

  return (
    <div className="page-container">
      <motion.div className="page-header" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1>Weekly Food Menu</h1>
        <p>See what's cooking this week!</p>
      </motion.div>

      <div className="menu-grid">
        {DAYS.map((day, i) => {
          const isToday = day === currentDayStr;
          return (
            <motion.div key={day} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
              <GlassCard className="menu-day-card" hover={false} style={isToday ? { border: '1px solid var(--neon-blue)', boxShadow: '0 0 20px rgba(96, 165, 250, 0.15)' } : {}}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <h3 className="menu-day-name" style={{ marginBottom: 0 }}>{day}</h3>
                  {isToday && <Badge variant="info">TODAY</Badge>}
                </div>
                {MEALS.map(meal => (
                  <div key={meal} className="menu-meal">
                    <span className="menu-meal-icon">{MEAL_ICONS[meal]}</span>
                    <div className="menu-meal-info">
                      <span className="menu-meal-type">{meal}</span>
                      <span className="menu-meal-items">{menu[day]?.[meal] || 'Not specified'}</span>
                    </div>
                  </div>
                ))}
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
