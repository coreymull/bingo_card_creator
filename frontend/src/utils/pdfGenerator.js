import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const generatePDF = async (settings) => {
  const bingoCard = document.querySelector('.bingo-card');
  if (!bingoCard) return;

  try {
    const canvas = await html2canvas(bingoCard, {
      scale: 2,
      useCORS: true,
      logging: false,
      allowTaint: true,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 30;

    pdf.setFontSize(18);
    pdf.text(settings.cardName || 'Bingo Card', pdfWidth / 2, 20, { align: 'center' });
    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);

    pdf.save(`${settings.cardName || 'bingo_card'}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};