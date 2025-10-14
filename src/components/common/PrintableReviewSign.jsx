import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ReviewQRCode from './ReviewQRCode';
import { FaPrint, FaDownload } from 'react-icons/fa';
import toast from 'react-hot-toast';

const PrintableReviewSign = () => {
  const signRef = useRef(null);

  const handlePrint = () => {
    window.print();
  };

  const downloadPDF = async () => {
    try {
      const canvas = await html2canvas(signRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        width: 794, // A4 width in pixels at 96 DPI
        height: 1123 // A4 height in pixels at 96 DPI
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // A4 dimensions: 210mm x 297mm
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
      pdf.save('whitebarn-review-sign.pdf');
      
      toast.success('Review sign downloaded as PDF!');
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast.error('Failed to download PDF');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      {/* Control buttons */}
      <div className="max-w-4xl mx-auto px-4 mb-6 print:hidden">
        <div className="flex justify-center space-x-4">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            <FaPrint className="h-4 w-4" />
            <span>Print Sign</span>
          </button>
          
          <button
            onClick={downloadPDF}
            className="flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
          >
            <FaDownload className="h-4 w-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* A4 Printable Sign */}
      <div 
        ref={signRef}
        className="bg-white mx-auto shadow-lg print:shadow-none"
        style={{
          width: '210mm',
          height: '297mm',
          maxWidth: '100%'
        }}
      >
        <div className="h-full flex flex-col items-center justify-center p-12 text-center">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-6xl font-serif text-amber-900 mb-4">
              Loved Your Event?
            </h1>
            <p className="text-2xl text-gray-700 font-light">
              Scan to leave us a quick review
            </p>
          </div>

          {/* QR Code */}
          <div className="mb-12">
            <ReviewQRCode 
              size={300} 
              showDownloadButtons={false}
              className="mb-6"
            />
            <p className="text-lg text-gray-600 font-medium">
              thewhitebarnfl.com/reviews
            </p>
          </div>

          {/* Platform Logos/Names */}
          <div className="mb-12">
            <p className="text-xl text-gray-700 mb-6">
              Leave a review on:
            </p>
            <div className="flex justify-center space-x-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-2">
                  <span className="text-white font-bold text-lg">G</span>
                </div>
                <p className="text-sm font-medium text-gray-700">Google</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-2">
                  <span className="text-white font-bold text-lg">W</span>
                </div>
                <p className="text-sm font-medium text-gray-700">WeddingWire</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mb-2">
                  <span className="text-white font-bold text-lg">K</span>
                </div>
                <p className="text-sm font-medium text-gray-700">The Knot</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto">
            <div className="text-center">
              <h2 className="text-3xl font-serif text-amber-900 mb-2">
                The White Barn FL
              </h2>
              <p className="text-lg text-gray-600">
                Where Dreams Come True
              </p>
              <p className="text-base text-gray-500 mt-2">
                4680 Volunteer Road, SW Ranches, FL 33330
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintableReviewSign;
