import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import BottomNav from './BottomNav';
import NotificationPanel from '../notifications/NotificationPanel';
import './layout.css';

export default function AppLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();

  // Track window size for robust mobile handling
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle ESC key and block body scroll
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
      const handleEsc = (e) => {
        if (e.key === 'Escape') setIsOpen(false);
      };
      window.addEventListener('keydown', handleEsc);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleEsc);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, isMobile]);

  return (
    <div className="app-layout">
      {/* 
        Bulletproof inline style enforcement for sidebar on mobile.
        When isMobile is true, explicitly translate based on isOpen state. 
      */}
      <div 
        className={`sidebar-wrapper ${isOpen ? 'open' : ''}`}
        style={
          isMobile 
            ? { 
                transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
                transition: 'transform 0.3s ease'
              } 
            : {} /* Desktop falls back to CSS */
        }
      >
        <Sidebar onClose={() => setIsOpen(false)} />
        
        {/* Overlay is only rendered/active on mobile when open */}
        {isMobile && isOpen && (
          <div 
            className="sidebar-overlay" 
            onClick={() => setIsOpen(false)} 
            style={{ display: 'block' }}
          />
        )}
      </div>

      <div className="main-wrapper">
        <TopBar onMenuToggle={() => setIsOpen(!isOpen)} />
        <main className="main-content">
          <Outlet />
        </main>
        <BottomNav />
      </div>

      <NotificationPanel />
    </div>
  );
}
