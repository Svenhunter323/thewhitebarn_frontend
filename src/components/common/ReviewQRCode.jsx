import { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FaFilePdf, FaImage } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ReviewQRCode = ({ 
  url = 'https://thewhitebarnfl.com/reviews', 
  size = 200, 
  showDownloadButtons = true,
  className = '' 
}) => {
  const qrRef = useRef(null);

  const downloadPNG = async () => {
    try {
      const canvas = await html2canvas(qrRef.current, {
        backgroundColor: '#ffffff',
        scale: 2
      });
      
      const link = document.createElement('a');
      link.download = 'whitebarn-reviews-qr.png';
      link.href = canvas.toDataURL();
      link.click();
      
      toast.success('QR Code downloaded as PNG!');
    } catch (error) {
      console.error('Error downloading PNG:', error);
      toast.error('Failed to download PNG');
    }
  };

  const downloadPDF = async () => {
    try {
      const canvas = await html2canvas(qrRef.current, {
        backgroundColor: '#ffffff',
        scale: 2
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      
      // Center the QR code on the page
      const imgWidth = 100;
      const imgHeight = 100;
      const x = (pdf.internal.pageSize.width - imgWidth) / 2;
      const y = (pdf.internal.pageSize.height - imgHeight) / 2;
      
      pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
      pdf.save('whitebarn-reviews-qr.pdf');
      
      toast.success('QR Code downloaded as PDF!');
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast.error('Failed to download PDF');
    }
  };

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <div 
        ref={qrRef} 
        className="bg-white p-4 rounded-lg shadow-md inline-block"
      >
        <QRCodeSVG
          value={url}
          size={size}
          level="M"
          includeMargin={true}
        />
      </div>
      
      {showDownloadButtons && (
        <div className="flex space-x-3">
          <button
            onClick={downloadPNG}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
          >
            <FaImage className="h-4 w-4" />
            <span>PNG</span>
          </button>
          
          <button
            onClick={downloadPDF}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
          >
            <FaFilePdf className="h-4 w-4" />
            <span>PDF</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewQRCode;
