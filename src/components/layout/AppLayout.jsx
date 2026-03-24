import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import BottomNav from './BottomNav';
import NotificationPanel from '../notifications/NotificationPanel';
import './layout.css';

export default function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="app-layout">
      <div className={`sidebar-wrapper ${mobileMenuOpen ? 'open' : ''}`}>
        <Sidebar onClose={() => setMobileMenuOpen(false)} />
        <div className="sidebar-overlay" onClick={() => setMobileMenuOpen(false)} />
      </div>

      <div className="main-wrapper">
        <TopBar onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
        <main className="main-content">
          <Outlet />
        </main>
        <BottomNav />
      </div>

      <NotificationPanel />
    </div>
  );
}
