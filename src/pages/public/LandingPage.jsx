import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useData } from '../../context/DataContext';
import NeonButton from '../../components/ui/NeonButton';
import GlassCard from '../../components/ui/GlassCard';
import Badge from '../../components/ui/Badge';
import { 
  HiLocationMarker, HiPhone, HiOutlineMail, HiWifi, 
  HiOutlineCheckCircle, HiArrowRight, HiStar
} from 'react-icons/hi';
import { MdRestaurant, MdAcUnit, MdLocalLaundryService, MdLocalParking, MdSecurity, MdBolt, MdFitnessCenter, MdWaterDrop, MdCleaningServices } from 'react-icons/md';
import './public.css';

const FACILITY_ICONS = {
  wifi: <HiWifi />,
  food: <MdRestaurant />,
  ac: <MdAcUnit />,
  laundry: <MdLocalLaundryService />,
  parking: <MdLocalParking />,
  security: <MdSecurity />,
  power: <MdBolt />,
  gym: <MdFitnessCenter />,
  water: <MdWaterDrop />,
  cleaning: <MdCleaningServices />,
};

const Section = ({ id, title, subtitle, children }) => (
  <section id={id} className="landing-section">
    <div className="section-container">
      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <span className="section-subtitle">{subtitle}</span>
        <h2 className="section-title">{title}</h2>
      </motion.div>
      {children}
    </div>
  </section>
);

export default function LandingPage() {
  const { getPgInfo, getRooms, getFacilities, getFeedback } = useData();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  
  const pgInfo = getPgInfo();
  const rooms = getRooms();
  const facilities = getFacilities();
  const feedbacks = getFeedback().filter(f => f.rating >= 4).slice(0, 3); // Top 3 positive reviews

  // Group rooms by type to show pricing options
  const roomTypes = rooms.reduce((acc, room) => {
    if (!acc[room.type] || room.rent < acc[room.type].rent) {
      acc[room.type] = room; // Keep lowest price for each type
    }
    return acc;
  }, {});

  useEffect(() => {
    document.title = `${pgInfo.name || 'PG'} | Home Away From Home`;
    window.scrollTo(0, 0); // Reset scroll on load
  }, [pgInfo.name]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-container">
          <Link to="/" className="nav-brand">
            <span style={{ fontSize: 24, marginRight: 8 }}>🏠</span>
            <span className="gradient-text">{pgInfo.name || 'PG Manager'}</span>
          </Link>
          <div className="nav-links">
            <button onClick={() => scrollTo('about')}>About</button>
            <button onClick={() => scrollTo('rooms')}>Rooms</button>
            <button onClick={() => scrollTo('facilities')}>Facilities</button>
            <button onClick={() => scrollTo('reviews')}>Reviews</button>
          </div>
          <div className="nav-actions">
            <Link to="/login">
              <NeonButton variant="ghost" size="sm">Login</NeonButton>
            </Link>
            <NeonButton size="sm" onClick={() => scrollTo('contact')}>Contact Us</NeonButton>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="hero" className="hero-section">
        <motion.div className="hero-bg" style={{ y }}>
          <img src={pgInfo.heroImage || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1600'} alt="PG Hero" />
          <div className="hero-overlay" />
        </motion.div>
        
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Badge variant="purple" className="hero-badge" style={{ marginBottom: 24 }}>Premium Co-living</Badge>
            <h1 className="hero-title">
              Experience <span className="gradient-text">Premium Living</span><br />
              at {pgInfo.name || 'Our PG'}
            </h1>
            <p className="hero-desc">{pgInfo.tagline}</p>
            
            <div className="hero-buttons">
              <NeonButton size="lg" onClick={() => scrollTo('rooms')} className="neon-btn-glow">
                Explore Rooms <HiArrowRight style={{ marginLeft: 8 }} />
              </NeonButton>
              <NeonButton size="lg" variant="secondary" onClick={() => scrollTo('contact')} style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
                Book a Visit
              </NeonButton>
            </div>
          </motion.div>
        </div>
      </header>

      {/* About Section */}
      <Section id="about" title="About Us" subtitle="Who We Are">
        <div className="about-grid">
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3>Your Comfort is Our Priority</h3>
            <p>{pgInfo.description}</p>
            <ul className="about-features">
              <li><HiOutlineCheckCircle className="text-success" /> Prime locations with easy access</li>
              <li><HiOutlineCheckCircle className="text-success" /> Hygienic and safe environment</li>
              <li><HiOutlineCheckCircle className="text-success" /> Transparent pricing, no hidden costs</li>
              <li><HiOutlineCheckCircle className="text-success" /> Smart app for hassle-free living</li>
            </ul>
          </motion.div>
          <motion.div 
            className="about-images"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard hover={false} className="about-image-card">
              <img src={pgInfo.galleryImages?.[0] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'} alt="Room interior" />
            </GlassCard>
            <div className="about-stats-card glass">
              <h4>{rooms.length}+</h4>
              <p>Premium Rooms</p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Rooms & Pricing */}
      <Section id="rooms" title="Our Rooms" subtitle="Accommodations">
        <div className="pricing-grid">
          {Object.values(roomTypes).map((room, i) => (
            <motion.div 
              key={room.type}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="pricing-card glass-strong">
                {i === 1 && <div className="popular-tag">Most Popular</div>}
                <div className="pricing-header">
                  <h3>{room.type} Sharing</h3>
                  <div className="price">
                    <span className="currency">₹</span>
                    <span className="amount">{room.rent.toLocaleString('en-IN')}</span>
                    <span className="period">/mo</span>
                  </div>
                </div>
                <ul className="pricing-features">
                  <li><HiOutlineCheckCircle /> Fully Furnished</li>
                  <li><HiOutlineCheckCircle /> {room.ac ? 'Air Conditioned' : 'Well Ventilated'}</li>
                  <li><HiOutlineCheckCircle /> Attached Bathroom</li>
                  <li><HiOutlineCheckCircle /> Daily Housekeeping</li>
                  <li><HiOutlineCheckCircle /> 3 Meals a Day included</li>
                </ul>
                <NeonButton fullWidth variant={i === 1 ? 'primary' : 'secondary'} onClick={() => scrollTo('contact')}>
                  Enquire Now
                </NeonButton>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Facilities */}
      <Section id="facilities" title="Premium Amenities" subtitle="What You Get">
        <div className="facilities-grid">
          {facilities.map((f, i) => (
            <motion.div 
              key={f.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="facility-item glass">
                <div className="facility-icon-wrap">
                  {FACILITY_ICONS[f.icon] || '✨'}
                </div>
                <h4>{f.name}</h4>
                <p>{f.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Gallery */}
      <Section id="gallery" title="Take a Tour" subtitle="Gallery">
        <div className="gallery-grid">
          {pgInfo.galleryImages?.slice(1, 7).map((img, i) => (
            <motion.div 
              key={i} 
              className="gallery-item"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <img src={img} alt={`Gallery ${i}`} />
              <div className="gallery-overlay" />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Reviews */}
      {feedbacks.length > 0 && (
        <Section id="reviews" title="What Tenants Say" subtitle="Testimonials">
          <div className="reviews-grid">
            {feedbacks.map((f, i) => (
              <motion.div 
                key={f.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="review-card" hover={false}>
                  <div className="review-stars">
                    {Array(5).fill(0).map((_, idx) => (
                      <HiStar key={idx} style={{ color: idx < f.rating ? 'var(--neon-yellow)' : 'var(--text-muted)' }} />
                    ))}
                  </div>
                  <p className="review-text">"{f.comment}"</p>
                  <div className="review-author">
                    <div className="review-avatar">T</div>
                    <div>
                      <h5>Verified Tenant</h5>
                      <span>Stayed recently</span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      {/* Contact & Footer */}
      <footer id="contact" className="landing-footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-col">
              <h3>{pgInfo.name}</h3>
              <p>{pgInfo.tagline}</p>
              <p className="footer-desc">Experience the best co-living spaces designed for students and working professionals.</p>
            </div>
            
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><button onClick={() => scrollTo('about')}>About Us</button></li>
                <li><button onClick={() => scrollTo('rooms')}>Rooms & Pricing</button></li>
                <li><button onClick={() => scrollTo('facilities')}>Amenities</button></li>
                <li><Link to="/login">Tenant Login</Link></li>
              </ul>
            </div>
            
            <div className="footer-col">
              <h4>Contact Us</h4>
              <ul className="contact-list">
                <li>
                  <HiLocationMarker className="contact-icon" />
                  <span>{pgInfo.address}</span>
                </li>
                <li>
                  <HiPhone className="contact-icon" />
                  <a href={`tel:${pgInfo.phone}`}>{pgInfo.phone}</a>
                </li>
                <li>
                  <HiOutlineMail className="contact-icon" />
                  <a href={`mailto:${pgInfo.email}`}>{pgInfo.email}</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} {pgInfo.name}. Powered by PG Manager SaaS.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
