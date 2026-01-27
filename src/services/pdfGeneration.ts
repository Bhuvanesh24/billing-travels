import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
<<<<<<< HEAD

export interface InvoiceData {
  customerName: string;
  driverName: string;
  vehicleNo: string;
=======
import QRCode from 'qrcode';

// Constant VPA from user
const UPI_VPA = '1975thilak-1@okicici';
const MERCHANT_NAME = 'Gokilam Travels'; // Or 'Thilak Sambath' based on screenshot, but company name is safer

export interface InvoiceData {
  customerName: string;
  customerCompanyName: string;
  customerAddress: string;
  customerGstNo: string;
  driverName: string;
  vehicleNo: string;
  vehicleType: string;
  tripStartLocation: string;
  tripEndLocation: string;
>>>>>>> 067fc01af595a7cdeae091c37760ebbb6f60356f
  startKm: number;
  endKm: number;
  startTime: string;
  endTime: string;
<<<<<<< HEAD
  rentType: 'fixed' | 'day-wise';
  fixedAmount: number;
  hours: number;
  ratePerHour: number;
=======
  rentType: 'fixed' | 'hour' | 'day' | 'km';
  fixedAmount: number;
  hours: number;
  ratePerHour: number;
  days: number;
  ratePerDay: number;
  fuelLitres: number;
  ratePerLitre: number;
  totalKm: number;
  freeKm: number;
  ratePerKm: number;
>>>>>>> 067fc01af595a7cdeae091c37760ebbb6f60356f
  additionalCosts: { label: string; amount: number }[];
  enableDiscount: boolean;
  discountAmount: number;
  enableGst: boolean;
<<<<<<< HEAD
=======
  gstPercentage: number;
>>>>>>> 067fc01af595a7cdeae091c37760ebbb6f60356f
  gstAmount: number;
  grandTotal: number;
}

<<<<<<< HEAD
export const generateInvoicePDF = (data: InvoiceData): { blob: Blob; fileName: string } => {
  const doc = new jsPDF();
  
  // Date/Time for Bill No
  const now = new Date();
  const dateStr = `${now.getFullYear()}${(now.getMonth()+1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}`;
=======
export const generateInvoicePDF = async (data: InvoiceData): Promise<{ blob: Blob; fileName: string }> => {
  const doc = new jsPDF();

  // Date/Time for Bill No
  const now = new Date();
  const dateStr = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}`;
>>>>>>> 067fc01af595a7cdeae091c37760ebbb6f60356f
  const timeStr = `${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;
  // Add a random 3-digit suffix for extra uniqueness
  const randomSuffix = Math.floor(Math.random() * 900 + 100);
  const billNo = `INV-${dateStr}-${timeStr}-${randomSuffix}`;
<<<<<<< HEAD
  
=======

>>>>>>> 067fc01af595a7cdeae091c37760ebbb6f60356f
  // Sanitize customer name for filename
  const cleanCustomerName = data.customerName ? data.customerName.replace(/[^a-z0-9]/gi, '_') : 'Customer';
  const fileName = `${billNo}_${cleanCustomerName}.pdf`;

  // --- Header ---
  // Company Name
  doc.setFontSize(22);
  doc.setTextColor(41, 128, 185); // Blue color scheme
  doc.text('Gokilam Travels', 105, 20, { align: 'center' });
<<<<<<< HEAD
  
=======

>>>>>>> 067fc01af595a7cdeae091c37760ebbb6f60356f
  // Company Details
  doc.setFontSize(10);
  doc.setTextColor(80);
  doc.text('30, Gokhale Street, Ram Nagar,', 105, 28, { align: 'center' });
  doc.text('Coimbatore - 641009', 105, 33, { align: 'center' });
  doc.text('Email: shivatravels1995@gmail.com', 105, 38, { align: 'center' });
  doc.text('Phone: 94436 82900, 82202 62205', 105, 43, { align: 'center' });
<<<<<<< HEAD
  
=======

>>>>>>> 067fc01af595a7cdeae091c37760ebbb6f60356f
  // Divider Line
  doc.setLineWidth(0.5);
  doc.setDrawColor(200);
  doc.line(15, 48, 195, 48);

  // --- Invoice Info ---
  doc.setFontSize(10);
  doc.setTextColor(0);
<<<<<<< HEAD
  
=======

>>>>>>> 067fc01af595a7cdeae091c37760ebbb6f60356f
  // Left Side: Bill To
  doc.setFont('helvetica', 'bold');
  doc.text('Bill To:', 15, 58);
  doc.setFont('helvetica', 'normal');
<<<<<<< HEAD
  doc.text(`Customer Name: ${data.customerName || '-'}`, 15, 64);
  doc.text(`Vehicle No: ${data.vehicleNo || '-'}`, 15, 70);
  doc.text(`Driver Name: ${data.driverName || '-'}`, 15, 76);
=======

  let currentY = 64;
  const lineHeight = 5;



  doc.text(`Customer Name: ${data.customerName || '-'}`, 15, currentY);
  currentY += lineHeight;

  if (data.customerCompanyName) {
    doc.text(`Company: ${data.customerCompanyName}`, 15, currentY);
    currentY += lineHeight;
  }

  if (data.customerAddress) {
    // Split address into lines if too long
    const addressLines = doc.splitTextToSize(`Address: ${data.customerAddress}`, 95); // Width limit for left column
    doc.text(addressLines, 15, currentY);
    currentY += (lineHeight * addressLines.length);
  }

  if (data.customerGstNo) {
    doc.text(`GST No: ${data.customerGstNo}`, 15, currentY);
    currentY += lineHeight;
  }

  doc.text(`Vehicle No: ${data.vehicleNo || '-'}`, 15, currentY);
  currentY += lineHeight;
  doc.text(`Driver Name: ${data.driverName || '-'}`, 15, currentY);
  currentY += lineHeight;
>>>>>>> 067fc01af595a7cdeae091c37760ebbb6f60356f

  // Right Side: Invoice Details
  const rightColX = 130;
  doc.setFont('helvetica', 'bold');
  doc.text('Invoice Details:', rightColX, 58);
  doc.setFont('helvetica', 'normal');
  doc.text(`Bill No: ${billNo}`, rightColX, 64);
  doc.text(`Date: ${now.toLocaleDateString()}`, rightColX, 70);
  doc.text(`Time: ${now.toLocaleTimeString()}`, rightColX, 76);

  // --- Trip Details Section ---
<<<<<<< HEAD
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
=======
  // Adjust starting Y dynamically based on left column height if needed, but usually Trip Details is lower
  const tripDetailsY = Math.max(currentY + 5, 82);

  doc.setFillColor(245, 247, 250);
  doc.roundedRect(15, tripDetailsY, 180, 22, 2, 2, 'F');

  const tripTextY = tripDetailsY + 6;
  const tripValueY = tripDetailsY + 12;

  doc.setFontSize(9);
  doc.text('Trip Start', 20, tripTextY);
  doc.setFont('helvetica', 'bold');
  doc.text(data.startTime ? new Date(data.startTime).toLocaleString() : '-', 20, tripValueY);

  doc.setFont('helvetica', 'normal');
  doc.text('Trip End', 70, tripTextY);
  doc.setFont('helvetica', 'bold');
  doc.text(data.endTime ? new Date(data.endTime).toLocaleString() : '-', 70, tripValueY);

  doc.setFont('helvetica', 'normal');
  doc.text('Total KM', 120, tripTextY);
  doc.setFont('helvetica', 'bold');
  const kmDiff = data.endKm - data.startKm;
  doc.text(`${kmDiff > 0 ? kmDiff : 0} km`, 120, tripValueY);

  doc.setFont('helvetica', 'normal');
  doc.text('KM Reading', 150, tripTextY);
  doc.setFont('helvetica', 'bold');
  doc.text(`${data.startKm} -> ${data.endKm}`, 150, tripValueY);

  // --- Items Table ---
  const tableBody = [];

  // 1. Rent Item
  let rentDescription = '';
  let rentAmount = 0;

  switch (data.rentType) {
    case 'fixed':
      rentDescription = 'Vehicle Rent (Fixed Amount)';
      rentAmount = data.fixedAmount;
      break;
    case 'hour':
      rentDescription = `Vehicle Rent (${data.hours} hrs @ Rs${data.ratePerHour}/hr)`;
      rentAmount = data.hours * data.ratePerHour;
      break;
    case 'day':
      rentDescription = `Vehicle Rent (${data.days} days @ Rs${data.ratePerDay}/day)`;
      rentAmount = data.days * data.ratePerDay;
      // Add fuel as a separate line item
      if (data.fuelLitres > 0 && data.ratePerLitre > 0) {
        tableBody.push([rentDescription, rentAmount.toFixed(2)]);
        tableBody.push([`Fuel (${data.fuelLitres} litres @ Rs${data.ratePerLitre}/L)`, (data.fuelLitres * data.ratePerLitre).toFixed(2)]);
        rentAmount = 0; // Already added, skip the push below
      }
      break;
    case 'km':
      const billableKm = Math.max(0, data.totalKm - data.freeKm);
      if (data.freeKm > 0) {
        rentDescription = `Vehicle Rent (${data.totalKm} km - ${data.freeKm} free km = ${billableKm} km @ Rs${data.ratePerKm}/km)`;
      } else {
        rentDescription = `Vehicle Rent (${data.totalKm} km @ Rs${data.ratePerKm}/km)`;
      }
      rentAmount = billableKm * data.ratePerKm;
      break;
  }

  if (rentAmount > 0) {
    tableBody.push([rentDescription, rentAmount.toFixed(2)]);
  }
>>>>>>> 067fc01af595a7cdeae091c37760ebbb6f60356f

  // 2. Additional Costs
  data.additionalCosts.forEach(cost => {
    tableBody.push([cost.label, cost.amount.toFixed(2)]);
  });

  autoTable(doc, {
<<<<<<< HEAD
    startY: 110,
    head: [['Description', 'Amount (Rs)']],
    body: tableBody,
    theme: 'striped',
    headStyles: { 
=======
    startY: tripDetailsY + 28,
    head: [['Description', 'Amount (Rs)']],
    body: tableBody,
    theme: 'striped',
    headStyles: {
>>>>>>> 067fc01af595a7cdeae091c37760ebbb6f60356f
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
<<<<<<< HEAD
=======

  // Check if we need a new page for totals
  if (finalY > 240) {
    doc.addPage();
    finalY = 20;
  }

>>>>>>> 067fc01af595a7cdeae091c37760ebbb6f60356f
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
<<<<<<< HEAD
    doc.text('GST (18%):', totalsXLabel, finalY);
=======
    doc.text(`GST (${data.gstPercentage}%):`, totalsXLabel, finalY);
>>>>>>> 067fc01af595a7cdeae091c37760ebbb6f60356f
    doc.text(`Rs:${data.gstAmount.toFixed(2)}`, totalsXValue, finalY, { align: 'right' });
    finalY += 7;
  }

  // Grand Total Line
  doc.setLineWidth(0.5);
  doc.line(totalsXLabel - 5, finalY - 4, 195, finalY - 4);
<<<<<<< HEAD
  
=======

>>>>>>> 067fc01af595a7cdeae091c37760ebbb6f60356f
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Grand Total:', totalsXLabel, finalY + 2);
  doc.text(`Rs:${data.grandTotal.toFixed(2)}`, totalsXValue, finalY + 2, { align: 'right' });

<<<<<<< HEAD
  // Footer Message
  doc.setFontSize(10);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(100);
  doc.text('Compute only, valid without signature.', 105, 270, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.text('Thank you for travelling with us!', 105, 275, { align: 'center' });
=======

  // --- UPI QR Code Section ---
  // Position it to the left of the totals, or below if space is tight.
  // Ideally, bottom left of the last page or same level as totals if space permits.

  // We'll put it on the left side of the totals area.
  const qrX = 15;
  const qrY = finalY - 25; // Roughly align with totals top
  const qrSize = 35;

  try {
    // Generate UPI URI
    // upi://pay?pa=...&pn=...&am=...&cu=INR
    // encodeURIComponent is safer
    const upiUri = `upi://pay?pa=${UPI_VPA}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${data.grandTotal.toFixed(2)}&cu=INR`;

    // Generate QR Data URL
    const qrDataUrl = await QRCode.toDataURL(upiUri, { errorCorrectionLevel: 'H' });

    // Add QR Image
    doc.addImage(qrDataUrl, 'PNG', qrX, qrY, qrSize, qrSize);

    // Add "Scan to Pay" text
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(41, 128, 185);
    doc.text('Scan to Pay with GPay/PhonePe', qrX + (qrSize / 2), qrY + qrSize + 5, { align: 'center' });

    // Make QR Clickable (Hyperlink)
    doc.link(qrX, qrY, qrSize, qrSize, { url: upiUri });

  } catch (err) {
    console.error('Error generating QR code:', err);
    // Fallback text if QR fails
    doc.setFontSize(8);
    doc.setTextColor(255, 0, 0);
    doc.text('Error generating QR Code', qrX, qrY + 10);
  }


  // Footer Message
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(100);
  doc.text('Compute only, valid without signature.', 105, pageHeight - 20, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.text('Thank you for travelling with us!', 105, pageHeight - 15, { align: 'center' });
>>>>>>> 067fc01af595a7cdeae091c37760ebbb6f60356f

  return { blob: doc.output('blob'), fileName };
};
