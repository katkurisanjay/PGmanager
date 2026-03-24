import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import GlassCard from '../../components/ui/GlassCard';
import NeonButton from '../../components/ui/NeonButton';
import Badge from '../../components/ui/Badge';
import { HiDownload } from 'react-icons/hi';
import { jsPDF } from 'jspdf';
import './tenant.css';

export default function TenantPayments() {
  const { user } = useAuth();
  const { getPayments, addPayment, getPgInfo } = useData();
  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState(null);

  const pgInfo = getPgInfo();
  const payments = getPayments()
    .filter(p => p.tenantId === user.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
  const hasPaidCurrentMonth = payments.some(p => p.month === currentMonth && p.status !== 'rejected');

  const handlePay = async () => {
    setSubmitting(true);
    let receiptUrl = null;

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const uploadRes = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          body: formData
        });
        const uploadData = await uploadRes.json();
        if (uploadData.success) {
          receiptUrl = uploadData.url;
        }
      } catch (err) {
        console.error("Upload failed", err);
        alert('File upload failed, but payment record will still be created.');
      }
    }

    await addPayment({
      tenantId: user.id,
      amount: user.rent,
      date: new Date().toISOString().split('T')[0],
      month: currentMonth,
      status: 'pending',
      receiptUrl: receiptUrl,
      receiptGenerated: false
    });
    
    setSubmitting(false);
    setFile(null);
    alert('Payment submitted for verification successfully!');
  };

  const generateReceipt = (payment) => {
    const doc = new jsPDF();
    
    doc.setFontSize(22);
    doc.text(pgInfo.name || 'PG Manager', 105, 25, { align: 'center' });
    doc.setFontSize(10);
    doc.text('Payment Receipt', 105, 33, { align: 'center' });

    doc.setLineWidth(0.5);
    doc.line(20, 38, 190, 38);

    doc.setFontSize(12);
    const y = 50;
    doc.text(`Receipt No: ${payment.id}`, 20, y);
    doc.text(`Date: ${payment.date}`, 20, y + 10);
    doc.text(`Tenant: ${user.name}`, 20, y + 20);
    doc.text(`Room: ${user.roomId}`, 20, y + 30);
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
        <h1>Payments</h1>
        <p>Make your rent payment and view history</p>
      </motion.div>

      <div className="two-col-grid">
        <GlassCard>
          <h3 style={{ marginBottom: 20 }}>Current Dues</h3>
          {!hasPaidCurrentMonth ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <span style={{ fontSize: 16, color: 'var(--text-secondary)' }}>Rent for {currentMonth}</span>
                <span style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)' }}>₹{user.rent.toLocaleString('en-IN')}</span>
              </div>
              
              <div className="payment-qr-section">
                <p style={{ marginBottom: 16 }}>Scan QR code to pay via UPI</p>
                <div className="payment-qr-placeholder">
                  {pgInfo.upiId ? (
                    <div>
                      <img src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=${pgInfo.upiId}&pn=${pgInfo.name}&am=${user.rent}&cu=INR`} alt="UPI QR" />
                      <p style={{ marginTop: 8, fontSize: 12 }}>UPI ID: {pgInfo.upiId}</p>
                    </div>
                  ) : (
                    <div>No UPI Linked</div>
                  )}
                </div>
                
                <div style={{ marginTop: 24, textAlign: 'left' }}>
                  <label style={{ display: 'block', fontSize: 12, marginBottom: 8, color: 'var(--text-tertiary)' }}>Upload Payment Screenshot (Optional)</label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    style={{ fontSize: 13, color: 'var(--text-secondary)' }} 
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
              </div>

              <NeonButton 
                className="neon-btn-glow" 
                fullWidth 
                size="lg" 
                onClick={handlePay}
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : 'I Have Paid'}
              </NeonButton>
            </div>
          ) : (
             <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
                <h3 style={{ fontSize: 20, marginBottom: 8 }}>All clear!</h3>
                <p style={{ color: 'var(--text-secondary)' }}>You have no pending dues for {currentMonth}.</p>
             </div>
          )}
        </GlassCard>

        <GlassCard>
          <h3 style={{ marginBottom: 20 }}>Payment History</h3>
          <div className="tenant-payment-history">
            {payments.length === 0 ? (
               <p className="no-alerts">No payment history found.</p>
            ) : (
              payments.map((p, i) => (
                <motion.div key={p.id} className="tph-item" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                  <div className="tph-info">
                    <h4>{p.month}</h4>
                    <p>{p.date}</p>
                  </div>
                  <div className="tph-right">
                    <span className="tph-amount">₹{p.amount.toLocaleString('en-IN')}</span>
                    <Badge variant={p.status === 'verified' ? 'success' : p.status === 'rejected' ? 'danger' : 'warning'}>
                      {p.status}
                    </Badge>
                  </div>
                  {p.status === 'verified' && (
                    <button style={{ background: 'none', color: 'var(--neon-blue)', marginLeft: 8 }} onClick={() => generateReceipt(p)} title="Download Receipt">
                      <HiDownload size={20} />
                    </button>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
