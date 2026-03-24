import { useState } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import GlassCard from '../../components/ui/GlassCard';
import NeonButton from '../../components/ui/NeonButton';
import Badge from '../../components/ui/Badge';
import SearchBar from '../../components/ui/SearchBar';
import { HiCheck, HiX, HiDownload, HiFilter } from 'react-icons/hi';
import { jsPDF } from 'jspdf';
import './admin.css';

export default function Payments() {
  const { getPayments, updatePayment, getTenantById, getPgInfo } = useData();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const payments = getPayments()
    .filter(p => {
      const tenant = getTenantById(p.tenantId);
      const matchesSearch = tenant?.name?.toLowerCase().includes(search.toLowerCase()) || p.month?.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === 'all' || p.status === filter;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleVerify = (id) => updatePayment(id, { status: 'verified', receiptGenerated: true });
  const handleReject = (id) => updatePayment(id, { status: 'rejected' });

  const generateReceipt = (payment) => {
    const tenant = getTenantById(payment.tenantId);
    const pg = getPgInfo();
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text(pg.name || 'PG Manager', 105, 25, { align: 'center' });
    doc.setFontSize(10);
    doc.text('Payment Receipt', 105, 33, { align: 'center' });

    doc.setLineWidth(0.5);
    doc.line(20, 38, 190, 38);

    doc.setFontSize(12);
    const y = 50;
    doc.text(`Receipt No: ${payment.id}`, 20, y);
    doc.text(`Date: ${payment.date}`, 20, y + 10);
    doc.text(`Tenant: ${tenant?.name || 'N/A'}`, 20, y + 20);
    doc.text(`Room: ${tenant?.roomId || 'N/A'}`, 20, y + 30);
    doc.text(`Month: ${payment.month}`, 20, y + 40);

    doc.setFontSize(16);
    doc.text(`Amount: ₹${payment.amount.toLocaleString('en-IN')}`, 20, y + 56);

    doc.setFontSize(10);
    doc.text(`Status: ${payment.status.toUpperCase()}`, 20, y + 68);

    doc.line(20, y + 80, 190, y + 80);
    doc.setFontSize(9);
    doc.text('This is a computer-generated receipt.', 105, y + 90, { align: 'center' });

    doc.save(`Receipt_${payment.id}.pdf`);
  };

  return (
    <div className="page-container">
      <motion.div className="page-header" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1>Payment Management</h1>
        <p>Track and verify tenant payments</p>
      </motion.div>

      <div className="action-bar">
        <div className="action-bar-left">
          <SearchBar placeholder="Search by tenant or month..." value={search} onChange={setSearch} />
        </div>
        <div className="action-bar-right">
          <div className="filter-chips">
            {['all', 'pending', 'verified', 'rejected'].map(f => (
              <button key={f} className={`filter-chip ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="cards-grid">
        {payments.map((payment, i) => {
          const tenant = getTenantById(payment.tenantId);
          return (
            <motion.div key={payment.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <GlassCard className="payment-card" hover={false}>
                <div className="payment-card-top">
                  <div>
                    <div className="payment-tenant-name">{tenant?.name || 'Unknown'}</div>
                    <div className="payment-month">{payment.month} • {payment.date}</div>
                  </div>
                  <Badge variant={payment.status === 'verified' ? 'success' : payment.status === 'rejected' ? 'danger' : 'warning'}>
                    {payment.status}
                  </Badge>
                </div>
                <div className="payment-amount">₹{payment.amount.toLocaleString('en-IN')}</div>
                <div className="payment-card-actions">
                  {payment.status === 'pending' && (
                    <>
                      <NeonButton size="sm" variant="success" onClick={() => handleVerify(payment.id)}><HiCheck /> Verify</NeonButton>
                      <NeonButton size="sm" variant="danger" onClick={() => handleReject(payment.id)}><HiX /> Reject</NeonButton>
                    </>
                  )}
                  {payment.status === 'verified' && (
                    <NeonButton size="sm" variant="secondary" onClick={() => generateReceipt(payment)}><HiDownload /> Receipt</NeonButton>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {payments.length === 0 && (
        <div className="empty-state">
          <h3>No payments found</h3>
          <p>Adjust your filters to see payments</p>
        </div>
      )}
    </div>
  );
}
