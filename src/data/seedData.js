// ============================================
// Seed Data — Demo dataset for PG Manager
// ============================================

export const DEMO_PG = {
  id: 'demo-pg',
  name: 'Greenview PG',
  tagline: 'Your Home Away From Home — Premium Living, Smart Management',
  description: 'Greenview PG offers premium co-living spaces with modern amenities, delicious food, and a vibrant community. Located in the heart of the city with easy access to IT parks, colleges, and public transport.',
  address: '42, MG Road, Koramangala, Bangalore - 560034',
  phone: '+91 98765 43210',
  email: 'info@greenviewpg.com',
  heroImage: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200',
  galleryImages: [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600',
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600',
    'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600',
  ],
  upiQr: null,
  upiId: 'greenviewpg@upi',
};

export const DEMO_ROOMS = [
  { id: 'R101', number: '101', floor: 1, type: 'Single', totalBeds: 1, rent: 8000, ac: true },
  { id: 'R102', number: '102', floor: 1, type: 'Double', totalBeds: 2, rent: 6000, ac: true },
  { id: 'R103', number: '103', floor: 1, type: 'Triple', totalBeds: 3, rent: 5000, ac: false },
  { id: 'R201', number: '201', floor: 2, type: 'Single', totalBeds: 1, rent: 8500, ac: true },
  { id: 'R202', number: '202', floor: 2, type: 'Double', totalBeds: 2, rent: 6500, ac: true },
  { id: 'R203', number: '203', floor: 2, type: 'Triple', totalBeds: 3, rent: 5000, ac: false },
  { id: 'R301', number: '301', floor: 3, type: 'Double', totalBeds: 2, rent: 7000, ac: true },
  { id: 'R302', number: '302', floor: 3, type: 'Double', totalBeds: 2, rent: 7000, ac: true },
];

export const DEMO_TENANTS = [
  {
    id: 'T001',
    name: 'Rahul Sharma',
    email: 'rahul@email.com',
    phone: '+91 99887 76655',
    aadhaar: '1234 5678 9012',
    address: '12, Nehru Nagar, Delhi',
    guardianName: 'Suresh Sharma',
    guardianPhone: '+91 99887 11223',
    roomId: 'R102',
    bedNumber: 1,
    joinDate: '2025-06-15',
    rent: 6000,
    dueDate: 5,
    photo: null,
    password: 'tenant123',
    username: 'tenant1',
  },
  {
    id: 'T002',
    name: 'Priya Patel',
    email: 'priya@email.com',
    phone: '+91 88776 55443',
    aadhaar: '2345 6789 0123',
    address: '56, Laxmi Colony, Mumbai',
    guardianName: 'Rakesh Patel',
    guardianPhone: '+91 88776 22334',
    roomId: 'R102',
    bedNumber: 2,
    joinDate: '2025-07-01',
    rent: 6000,
    dueDate: 5,
    photo: null,
    password: 'tenant234',
    username: 'tenant2',
  },
  {
    id: 'T003',
    name: 'Amit Kumar',
    email: 'amit@email.com',
    phone: '+91 77665 44332',
    aadhaar: '3456 7890 1234',
    address: '89, Gandhi Road, Pune',
    guardianName: 'Vijay Kumar',
    guardianPhone: '+91 77665 33445',
    roomId: 'R103',
    bedNumber: 1,
    joinDate: '2025-08-10',
    rent: 5000,
    dueDate: 10,
    photo: null,
    password: 'tenant345',
    username: 'tenant3',
  },
  {
    id: 'T004',
    name: 'Sneha Reddy',
    email: 'sneha@email.com',
    phone: '+91 66554 33221',
    aadhaar: '4567 8901 2345',
    address: '23, Park Avenue, Hyderabad',
    guardianName: 'Ramesh Reddy',
    guardianPhone: '+91 66554 44556',
    roomId: 'R201',
    bedNumber: 1,
    joinDate: '2025-09-01',
    rent: 8500,
    dueDate: 1,
    photo: null,
    password: 'tenant456',
    username: 'tenant4',
  },
  {
    id: 'T005',
    name: 'Karthik Nair',
    email: 'karthik@email.com',
    phone: '+91 55443 22110',
    aadhaar: '5678 9012 3456',
    address: '45, Beach Road, Chennai',
    guardianName: 'Mohan Nair',
    guardianPhone: '+91 55443 66778',
    roomId: 'R202',
    bedNumber: 1,
    joinDate: '2025-10-15',
    rent: 6500,
    dueDate: 15,
    photo: null,
    password: 'tenant567',
    username: 'tenant5',
  },
  {
    id: 'T006',
    name: 'Divya Iyer',
    email: 'divya@email.com',
    phone: '+91 44332 11009',
    aadhaar: '6789 0123 4567',
    address: '78, Lake View, Kochi',
    guardianName: 'Srinivas Iyer',
    guardianPhone: '+91 44332 88990',
    roomId: 'R301',
    bedNumber: 1,
    joinDate: '2025-11-01',
    rent: 7000,
    dueDate: 1,
    photo: null,
    password: 'tenant678',
    username: 'tenant6',
  },
];

export const DEMO_PAYMENTS = [
  { id: 'P001', tenantId: 'T001', amount: 6000, date: '2026-02-05', status: 'verified', month: 'February 2026', screenshot: null, receiptGenerated: true },
  { id: 'P002', tenantId: 'T002', amount: 6000, date: '2026-02-05', status: 'verified', month: 'February 2026', screenshot: null, receiptGenerated: true },
  { id: 'P003', tenantId: 'T003', amount: 5000, date: '2026-02-12', status: 'verified', month: 'February 2026', screenshot: null, receiptGenerated: true },
  { id: 'P004', tenantId: 'T004', amount: 8500, date: '2026-02-01', status: 'verified', month: 'February 2026', screenshot: null, receiptGenerated: true },
  { id: 'P005', tenantId: 'T005', amount: 6500, date: '2026-02-16', status: 'pending', month: 'February 2026', screenshot: null, receiptGenerated: false },
  { id: 'P006', tenantId: 'T001', amount: 6000, date: '2026-03-05', status: 'verified', month: 'March 2026', screenshot: null, receiptGenerated: true },
  { id: 'P007', tenantId: 'T002', amount: 6000, date: '2026-03-06', status: 'pending', month: 'March 2026', screenshot: null, receiptGenerated: false },
  { id: 'P008', tenantId: 'T003', amount: 5000, date: '2026-03-10', status: 'pending', month: 'March 2026', screenshot: null, receiptGenerated: false },
  { id: 'P009', tenantId: 'T006', amount: 7000, date: '2026-03-01', status: 'verified', month: 'March 2026', screenshot: null, receiptGenerated: true },
];

export const DEMO_COMPLAINTS = [
  { id: 'C001', tenantId: 'T001', title: 'Water Leakage', description: 'There is a water leak in the bathroom ceiling. Water drips especially during rain.', status: 'in-progress', date: '2026-03-10', image: null },
  { id: 'C002', tenantId: 'T003', title: 'WiFi Not Working', description: 'The WiFi has been very slow for the past 3 days. Cannot attend online meetings.', status: 'pending', date: '2026-03-15', image: null },
  { id: 'C003', tenantId: 'T005', title: 'AC Not Cooling', description: 'The AC in room 202 is not cooling properly. It makes a strange noise.', status: 'resolved', date: '2026-03-01', image: null },
];

export const DEMO_ANNOUNCEMENTS = [
  {
    id: 'A001',
    title: 'Water Supply Interruption',
    description: 'There will be a scheduled water supply interruption on March 20th from 10 AM to 2 PM due to maintenance work. Please store water accordingly.',
    tag: 'urgent',
    date: '2026-03-18',
    image: null,
  },
  {
    id: 'A002',
    title: 'Holi Celebration 🎨',
    description: 'We are organizing a Holi celebration on March 25th in the common area! Refreshments will be provided. Everyone is welcome to join!',
    tag: 'general',
    date: '2026-03-16',
    image: null,
  },
  {
    id: 'A003',
    title: 'New Gym Equipment',
    description: 'We have added new gym equipment including a treadmill and dumbbells. The gym is open from 6 AM to 10 PM.',
    tag: 'general',
    date: '2026-03-12',
    image: null,
  },
];

export const DEMO_FOOD_MENU = {
  Monday: { breakfast: 'Idli, Sambar, Chutney', lunch: 'Rice, Dal, Aloo Gobi, Roti', dinner: 'Chapati, Paneer Butter Masala, Salad' },
  Tuesday: { breakfast: 'Poha, Boiled Eggs, Tea', lunch: 'Rice, Rajma, Cabbage Sabzi, Roti', dinner: 'Rice, Chicken Curry, Raita' },
  Wednesday: { breakfast: 'Upma, Vada, Coffee', lunch: 'Rice, Sambar, Beans Fry, Roti', dinner: 'Chapati, Dal Makhani, Salad' },
  Thursday: { breakfast: 'Dosa, Chutney, Sambar', lunch: 'Biryani, Raita, Boiled Egg', dinner: 'Roti, Mixed Veg, Dal, Rice' },
  Friday: { breakfast: 'Paratha, Curd, Pickle', lunch: 'Rice, Fish Curry / Paneer, Roti', dinner: 'Fried Rice, Manchurian, Soup' },
  Saturday: { breakfast: 'Bread, Omelette, Juice', lunch: 'Rice, Chole, Puri, Sweet', dinner: 'Chapati, Egg Curry / Aloo, Rice' },
  Sunday: { breakfast: 'Puri Bhaji, Sweet, Juice', lunch: 'Special Biryani, Dessert, Raita', dinner: 'Light — Bread, Soup, Salad' },
};

export const DEMO_FACILITIES = [
  { id: 'F001', name: 'Free WiFi', icon: 'wifi', description: 'High-speed 100 Mbps WiFi' },
  { id: 'F002', name: 'Home Food', icon: 'food', description: '3 meals a day — breakfast, lunch, dinner' },
  { id: 'F003', name: 'AC Rooms', icon: 'ac', description: 'Air conditioned rooms available' },
  { id: 'F004', name: 'Laundry', icon: 'laundry', description: 'Weekly laundry service included' },
  { id: 'F005', name: 'Parking', icon: 'parking', description: 'Two-wheeler & four-wheeler parking' },
  { id: 'F006', name: '24/7 Security', icon: 'security', description: 'CCTV surveillance & security guard' },
  { id: 'F007', name: 'Power Backup', icon: 'power', description: 'Uninterrupted power supply' },
  { id: 'F008', name: 'Gym', icon: 'gym', description: 'Fully equipped fitness center' },
  { id: 'F009', name: 'Hot Water', icon: 'water', description: '24/7 hot water supply' },
  { id: 'F010', name: 'Housekeeping', icon: 'cleaning', description: 'Daily room cleaning service' },
];

export const DEMO_FEEDBACK = [
  { id: 'FB001', tenantId: 'T001', rating: 5, comment: 'Excellent PG! Great food and friendly staff. Highly recommended.', date: '2026-03-10' },
  { id: 'FB002', tenantId: 'T003', rating: 4, comment: 'Good facilities and clean rooms. WiFi could be better.', date: '2026-03-08' },
  { id: 'FB003', tenantId: 'T004', rating: 5, comment: 'Best PG in the area. Love the home-cooked food!', date: '2026-02-28' },
  { id: 'FB004', tenantId: 'T006', rating: 4, comment: 'Nice place to stay. Maintenance response could be faster.', date: '2026-02-20' },
];

export const DEMO_NOTIFICATIONS = [
  { id: 'N001', type: 'payment', message: 'Priya Patel\'s March rent payment is pending verification', date: '2026-03-06', read: false, severity: 'warning' },
  { id: 'N002', type: 'complaint', message: 'New complaint raised: WiFi Not Working by Amit Kumar', date: '2026-03-15', read: false, severity: 'info' },
  { id: 'N003', type: 'reminder', message: 'Karthik Nair\'s rent is due in 3 days', date: '2026-03-12', read: false, severity: 'warning' },
  { id: 'N004', type: 'payment', message: 'Divya Iyer\'s March rent has been verified', date: '2026-03-01', read: true, severity: 'success' },
  { id: 'N005', type: 'reminder', message: 'Sneha Reddy\'s April rent is due on April 1st', date: '2026-03-18', read: false, severity: 'danger' },
];

export const ADMIN_USER = {
  id: 'admin',
  name: 'Admin',
  email: 'admin@greenviewpg.com',
  role: 'admin',
  username: 'admin',
  password: 'admin123',
};


