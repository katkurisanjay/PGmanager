import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import GlassCard from '../../components/ui/GlassCard';
import { HiDocumentDownload, HiChartPie, HiDocumentReport } from 'react-icons/hi';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import './admin.css';

export default function Reports() {
  const { getTenants, getPayments, getPgInfo } = useData();

  const exportTenantsExcel = () => {
    const tenants = getTenants().map(t => ({
      Name: t.name,
      Phone: t.phone,
      Email: t.email,
      'Room ID': t.roomId,
      'Bed': t.bedNumber,
      'Rent Amount': t.rent,
      'Join Date': t.joinDate,
      'Aadhaar': t.aadhaar,
      'Guardian Name': t.guardianName,
      'Guardian Phone': t.guardianPhone,
    }));
    const ws = XLSX.utils.json_to_sheet(tenants);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tenants");
    XLSX.writeFile(wb, "Tenants_Report.xlsx");
  };

  const exportPaymentsPDF = () => {
    const payments = getPayments().map(p => {
      const tenant = getTenants().find(t => t.id === p.tenantId);
      return [
        p.id,
        tenant ? tenant.name : 'Unknown',
        p.month,
        p.date,
        `Rs. ${p.amount}`,
        p.status.toUpperCase()
      ];
    });

    const doc = new jsPDF();
    const pg = getPgInfo();
    
    doc.setFontSize(18);
    doc.text(pg.name || 'PG Manager', 14, 20);
    doc.setFontSize(12);
    doc.text('Payments Report', 14, 30);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 38);

    autoTable(doc, {
      startY: 45,
      head: [['ID', 'Tenant', 'Month', 'Date', 'Amount', 'Status']],
      body: payments,
      theme: 'grid',
      headStyles: { fillColor: [102, 126, 234] },
    });

    doc.save("Payments_Report.pdf");
  };

  return (
    <div className="page-container">
      <motion.div className="page-header" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1>Reports & Analytics</h1>
        <p>Export your data and view insights</p>
      </motion.div>

      <div className="cards-grid">
        <GlassCard className="report-card" onClick={exportTenantsExcel}>
          <div className="report-icon" style={{ color: 'var(--status-success)' }}><HiDocumentDownload /></div>
          <h3 className="report-title">Export Tenants</h3>
          <p className="report-desc">Download all tenant details as an Excel spreadsheet</p>
        </GlassCard>

        <GlassCard className="report-card" onClick={exportPaymentsPDF}>
          <div className="report-icon" style={{ color: 'var(--neon-purple)' }}><HiDocumentReport /></div>
          <h3 className="report-title">Payment History</h3>
          <p className="report-desc">Generate a PDF report of all recorded payments</p>
        </GlassCard>

        <GlassCard className="report-card" hover={false}>
          <div className="report-icon" style={{ color: 'var(--neon-blue)' }}><HiChartPie /></div>
          <h3 className="report-title">Monthly Analytics</h3>
          <p className="report-desc">View the Dashboard tab for visual charts and trends</p>
        </GlassCard>
      </div>
    </div>
  );
}
