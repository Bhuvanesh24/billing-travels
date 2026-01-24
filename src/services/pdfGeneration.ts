import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface InvoiceData {
  customerName: string;
  driverName: string;
  vehicleNo: string;
  startKm: number;
  endKm: number;
  startTime: string;
  endTime: string;
  rentType: 'fixed' | 'day-wise';
  fixedAmount: number;
  hours: number;
  ratePerHour: number;
  additionalCosts: { label: string; amount: number }[];
  enableDiscount: boolean;
  discountAmount: number;
  enableGst: boolean;
  gstAmount: number;
  grandTotal: number;
}

export const generateInvoicePDF = (data: InvoiceData): { blob: Blob; fileName: string } => {
  const doc = new jsPDF();
  
  // Date/Time for Bill No
  const now = new Date();
  const dateStr = `${now.getFullYear()}${(now.getMonth()+1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}`;
  const timeStr = `${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;
  // Add a random 3-digit suffix for extra uniqueness
  const randomSuffix = Math.floor(Math.random() * 900 + 100);
  const billNo = `INV-${dateStr}-${timeStr}-${randomSuffix}`;
  
  // Sanitize customer name for filename
  const cleanCustomerName = data.customerName ? data.customerName.replace(/[^a-z0-9]/gi, '_') : 'Customer';
  const fileName = `${billNo}_${cleanCustomerName}.pdf`;

  // --- Header ---
  // Company Name
  doc.setFontSize(22);
  doc.setTextColor(41, 128, 185); // Blue color scheme
  doc.text('Gokilam Travels', 105, 20, { align: 'center' });
  
  // Company Details
  doc.setFontSize(10);
  doc.setTextColor(80);
  doc.text('30, Gokhale Street, Ram Nagar,', 105, 28, { align: 'center' });
  doc.text('Coimbatore - 641009', 105, 33, { align: 'center' });
  doc.text('Email: shivatravels1995@gmail.com', 105, 38, { align: 'center' });
  doc.text('Phone: 94436 82900, 82202 62205', 105, 43, { align: 'center' });
  
  // Divider Line
  doc.setLineWidth(0.5);
  doc.setDrawColor(200);
  doc.line(15, 48, 195, 48);

  // --- Invoice Info ---
  doc.setFontSize(10);
  doc.setTextColor(0);
  
  // Left Side: Bill To
  doc.setFont('helvetica', 'bold');
  doc.text('Bill To:', 15, 58);
  doc.setFont('helvetica', 'normal');
  doc.text(`Customer Name: ${data.customerName || '-'}`, 15, 64);
  doc.text(`Vehicle No: ${data.vehicleNo || '-'}`, 15, 70);
  doc.text(`Driver Name: ${data.driverName || '-'}`, 15, 76);

  // Right Side: Invoice Details
  const rightColX = 130;
  doc.setFont('helvetica', 'bold');
  doc.text('Invoice Details:', rightColX, 58);
  doc.setFont('helvetica', 'normal');
  doc.text(`Bill No: ${billNo}`, rightColX, 64);
  doc.text(`Date: ${now.toLocaleDateString()}`, rightColX, 70);
  doc.text(`Time: ${now.toLocaleTimeString()}`, rightColX, 76);

  // --- Trip Details Section ---
  doc.setFillColor(245, 247, 250);
  doc.roundedRect(15, 82, 180, 22, 2, 2, 'F');
  
  doc.setFontSize(9);
  doc.text('Trip Start', 20, 88);
  doc.setFont('helvetica', 'bold');
  doc.text(data.startTime ? new Date(data.startTime).toLocaleString() : '-', 20, 94);
  
  doc.setFont('helvetica', 'normal');
  doc.text('Trip End', 70, 88);
  doc.setFont('helvetica', 'bold');
  doc.text(data.endTime ? new Date(data.endTime).toLocaleString() : '-', 70, 94);

  doc.setFont('helvetica', 'normal');
  doc.text('Total KM', 120, 88);
  doc.setFont('helvetica', 'bold');
  const kmDiff = data.endKm - data.startKm;
  doc.text(`${kmDiff > 0 ? kmDiff : 0} km`, 120, 94);
  
  doc.setFont('helvetica', 'normal'); 
  doc.text('KM Reading', 150, 88);
  doc.setFont('helvetica', 'bold');
  doc.text(`${data.startKm} -> ${data.endKm}`, 150, 94);

  // --- Items Table ---
  const tableBody = [];
  
  // 1. Rent Item
  let rentDescription = '';
  let rentAmount = 0;
  if (data.rentType === 'fixed') {
    rentDescription = 'Vehicle Rent (Fixed Amount)';
    rentAmount = data.fixedAmount;
  } else {
    rentDescription = `Vehicle Rent (${data.hours} hrs @ Rs${data.ratePerHour}/hr)`;
    rentAmount = data.hours * data.ratePerHour;
  }
  tableBody.push([rentDescription, rentAmount.toFixed(2)]);

  // 2. Additional Costs
  data.additionalCosts.forEach(cost => {
    tableBody.push([cost.label, cost.amount.toFixed(2)]);
  });

  autoTable(doc, {
    startY: 110,
    head: [['Description', 'Amount (Rs)']],
    body: tableBody,
    theme: 'striped',
    headStyles: { 
      fillColor: [41, 128, 185],
      textColor: 255,
      fontStyle: 'bold'
    },
    styles: {
      fontSize: 10,
      cellPadding: 5,
      lineColor: [200, 200, 200],
      lineWidth: 0.1,
    },
    columnStyles: {
      0: { cellWidth: 'auto' }, // Description
      1: { cellWidth: 50, halign: 'right' } // Amount
    }
  });

  // --- Totals Section ---
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let finalY = (doc as any).lastAutoTable.finalY + 10;
  const totalsXLabel = 130;
  const totalsXValue = 190;

  // Subtotal calculation from table body to be safe, or just use what we have? 
  // Let's rely on the passed-in grand total logic mostly, but we can reconstruct subtotal for display.
  const subtotal = tableBody.reduce((sum, row) => sum + parseFloat(row[1] as string), 0);

  doc.setFont('helvetica', 'normal');
  doc.text('Subtotal:', totalsXLabel, finalY);
  doc.text(`Rs:${subtotal.toFixed(2)}`, totalsXValue, finalY, { align: 'right' });
  finalY += 7;

  if (data.enableDiscount) {
    doc.setTextColor(200, 0, 0); // Red
    doc.text('Discount:', totalsXLabel, finalY);
    doc.text(`-Rs:${data.discountAmount.toFixed(2)}`, totalsXValue, finalY, { align: 'right' });
    doc.setTextColor(0);
    finalY += 7;
  }

  if (data.enableGst) {
    doc.text('GST (18%):', totalsXLabel, finalY);
    doc.text(`Rs:${data.gstAmount.toFixed(2)}`, totalsXValue, finalY, { align: 'right' });
    finalY += 7;
  }

  // Grand Total Line
  doc.setLineWidth(0.5);
  doc.line(totalsXLabel - 5, finalY - 4, 195, finalY - 4);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Grand Total:', totalsXLabel, finalY + 2);
  doc.text(`Rs:${data.grandTotal.toFixed(2)}`, totalsXValue, finalY + 2, { align: 'right' });

  // Footer Message
  doc.setFontSize(10);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(100);
  doc.text('Compute only, valid without signature.', 105, 270, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.text('Thank you for travelling with us!', 105, 275, { align: 'center' });

  return { blob: doc.output('blob'), fileName };
};
