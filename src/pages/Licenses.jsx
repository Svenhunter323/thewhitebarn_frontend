import { motion } from 'framer-motion';
import { FaCertificate, FaExternalLinkAlt, FaDownload, FaFileAlt } from 'react-icons/fa';
import AnimatedButton from '../components/ui/AnimatedButton';

const Licenses = () => {
  // Actual licenses and certificates from the original PHP project
  const licenses = [
    {
      title: 'AMERICAN MARRIAGE MINISTRIES GEORGINA CERTIFICATE',
      logo: '/images/licensespdf/AMERICAN-MARRIAGE-logo.jpg',
      pdfUrl: '/images/licensespdf/AMERICAN-MARRIAGE-MINISTRIES-GEORGINA-CERTIFICATE.pdf',
      type: 'certificate'
    },
    {
      title: 'AMERICAN MARRIAGE MINISTRIES MIGUEL CERTIFICATE',
      logo: '/images/licensespdf/AMERICAN-MARRIAGE-logo.jpg',
      pdfUrl: '/images/licensespdf/AMERICAN-MARRIAGE-MINISTRIES-MIGUEL-CERTIFICATE.pdf',
      type: 'certificate'
    },
    {
      title: 'Florida Department of Agriculture and Consumer Services',
      logo: '/images/licensespdf/FDACS-logo.jpg',
      pdfUrl: '/images/licensespdf/FDACS-NOTICE-OF-INTENT-FOR-THE-BMP.pdf',
      type: 'certificate'
    },
    {
      title: 'Sales Tax Certificate - Cielo Farms 2024',
      logo: '/images/licensespdf/fdor-logo.jpg',
      pdfUrl: '/images/licensespdf/SALES-TAX-CERTIFICATE-CIELO-FARMS-2024.pdf',
      type: 'certificate'
    },
    {
      title: 'Florida Agritourism Association',
      logo: '/images/licensespdf/flroidaagritourismassociation-logo.jpg',
      pdfUrl: '/images/licensespdf/FLORIDA-AGRITOURISM-ASSOCIATION-LETTER-OR-ACKNOWLEDGEMENT.pdf',
      type: 'certificate'
    },
    {
      title: 'Visit Florida Farms ORG',
      logo: '/images/licensespdf/floridaagritourismass-logo.jpg',
      pdfUrl: 'https://visitfloridafarms.org/activities/farm-nursery-ranch/#!biz/id/63bd338d58eacf12d44c2481',
      type: 'external'
    },
    {
      title: 'FDACS Notice',
      logo: '/images/licensespdf/FDACS-logo.jpg',
      pdfUrl: '/images/licensespdf/FDACS-NOTICE-OF-INTENT-FOR-THE-BMP.pdf',
      type: 'certificate'
    },
    {
      title: 'CIELO FARMS LLC BUSINESS TAX RECEIPT',
      logo: '/images/licensespdf/cielofarms-logo.jpg',
      pdfUrl: '/images/licensespdf/CIELO-FARMS-LLC-BUSINESS-TAX-RECEIPT.pdf',
      type: 'certificate'
    },
    {
      title: 'Florida Farm Bureau New Membership',
      logo: '/images/licensespdf/membership-logo.jpg',
      pdfUrl: '/images/licensespdf/FLORIDA-FARM-BUREAU-NEW-MEMBERSHIP-CARD-2024.pdf',
      type: 'certificate'
    },
    {
      title: 'FAA Membership White Barn FL',
      logo: '/images/licensespdf/floridaagritourismass-logo.jpg',
      pdfUrl: 'https://visitfloridafarms.org/activities/farm-nursery-ranch/#!biz/id/63bd338d58eacf12d44c2481',
      type: 'external'
    },
    {
      title: 'CERTIFICATE OF NURSERY REGISTRATION',
      logo: '/images/licensespdf/FDACS-logo.jpg',
      pdfUrl: '/images/licensespdf/CERTIFICATE-OF-NURSERY-REGISTRATION-FROM-JULY-2023-TO-2024.pdf',
      type: 'certificate'
    },
    {
      title: 'CERTIFICATE OF USE TOWN',
      logo: '/images/licensespdf/cielofarms-logo.jpg',
      pdfUrl: '/images/licensespdf/CERTIFICATE-OF-USE-TOWN-OF-SOUTHWEST-RANCHES-2021-060223-Medina-Letter.pdf',
      type: 'certificate'
    },
    {
      title: 'BUSINESS TAX RECEIPT',
      logo: '/images/licensespdf/cielofarms-logo.jpg',
      pdfUrl: '/images/licensespdf/CIELO-FARMS-LLC-BUSINESS-TAX-RECEIPT.pdf',
      type: 'certificate'
    },
    {
      title: 'CERTIFICATE OF NURSERY REGISTRATION',
      logo: '/images/licensespdf/FDACS-logo.jpg',
      pdfUrl: '/images/licensespdf/CIELO-FARMS-LLC-NURSERY-REGISTRATION-JULY-2024.pdf',
      type: 'certificate'
    },
    {
      title: 'FDACS NOTICE OF INTENT',
      logo: '/images/licensespdf/FDACS-logo.jpg',
      pdfUrl: '/images/licensespdf/FDACS-NOTICE-OF-INTENT-FOR-CIELO-FARMS-LLC-FROM-BMP.pdf',
      type: 'certificate'
    },
    {
      title: 'LAST NURSERY INSPECTION',
      logo: '/images/licensespdf/FDACS-logo.jpg',
      pdfUrl: '/images/licensespdf/LAST-NURSERY-INSPECTION-AT-CIELO-FARMS.pdf',
      type: 'certificate'
    },
    {
      title: 'FDACS STEVEN HALL',
      logo: '/images/licensespdf/FDACS-logo.jpg',
      pdfUrl: '/images/licensespdf/LETTER-FROM-FDACS-STEVEN-HALL.pdf',
      type: 'certificate'
    },
    {
      title: 'SHEEP FDACS Premise ID',
      logo: '/images/licensespdf/cielofarms-logo.jpg',
      pdfUrl: '/images/licensespdf/PREMISE-CARD.pdf',
      type: 'certificate'
    },
    {
      title: 'VALUE ADJUSTMENT BOARD REMAND TO PROPERTY APPRAISERS',
      logo: '/images/licensespdf/fdor-logo.jpg',
      pdfUrl: '/images/licensespdf/VALUE-ADJUSTMENT-BOARD-REMAND-TO-PROPERTY-APPRAISERS.pdf',
      type: 'certificate'
    }
  ];

  const handleCertificateClick = (license) => {
    if (license.type === 'external') {
      window.open(license.pdfUrl, '_blank');
    } else {
      window.open(license.pdfUrl, '_blank');
    }
  };

  return (
    <div className="">
      {/* Page Title Section */}
      <section className="relative py-24 text-black overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/images/background/page-title-bg.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent z-100"></div>
        </div>
        
        <div className="container-custom text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-serif font-bold mb-4"
          >
            Licenses & Accreditations
          </motion.h1>
          <motion.nav
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center items-center space-x-2 text-lg"
          >
            <a href="/" className="hover:text-red-500 transition-colors">Home</a>
            <span>/</span>
            <span>Licenses & Accreditations</span>
          </motion.nav>
        </div>
      </section>

      {/* Licenses and Certificates Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="heading-secondary mb-4">Our Official Licenses & Certifications</h2>
            <p className="text-body max-w-3xl mx-auto">
              The White Barn FL maintains all necessary licenses, permits, and certifications 
              to operate as a premier wedding and event venue. Click on any certificate below 
              to view the official documentation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {licenses.map((license, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                onClick={() => handleCertificateClick(license)}
              >
                <div className="p-6">
                  {/* Logo */}
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
                      <img
                        src={license.logo}
                        alt={license.title}
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          e.target.src = '/images/licensespdf/FDACS-logo.jpg'; // Fallback logo
                        }}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-center mb-4 text-gray-900 group-hover:text-primary-600 transition-colors">
                    {license.title}
                  </h3>

                  {/* Action Button */}
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-full text-sm font-medium group-hover:bg-primary-100 transition-colors">
                      {license.type === 'external' ? (
                        <>
                          <FaExternalLinkAlt className="text-xs" />
                          <span>Click Here</span>
                        </>
                      ) : (
                        <>
                          <FaFileAlt className="text-xs" />
                          <span>View Certificate</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust and Compliance Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <FaCertificate className="text-primary-500 text-5xl mx-auto mb-6" />
              <h2 className="text-3xl font-serif font-bold mb-6 text-gray-900">
                Fully Licensed & Compliant
              </h2>
              <p className="text-body mb-6">
                The White Barn FL operates under all required federal, state, and local licenses. 
                Our venue is fully compliant with agricultural, business, tax, and safety regulations. 
                We are proud members of the Florida Agritourism Association and maintain active 
                certifications with the Florida Department of Agriculture and Consumer Services.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FaCertificate className="text-green-600 text-2xl" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">FDACS Certified</h4>
                  <p className="text-sm text-gray-600">Florida Department of Agriculture certified nursery and agritourism facility</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FaFileAlt className="text-blue-600 text-2xl" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Business Licensed</h4>
                  <p className="text-sm text-gray-600">All business tax receipts and permits current and in good standing</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FaExternalLinkAlt className="text-purple-600 text-2xl" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Association Member</h4>
                  <p className="text-sm text-gray-600">Active member of Florida Agritourism Association and Farm Bureau</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gray-900 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6">
              Questions About Our Credentials?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              We're transparent about our licensing and happy to provide verification 
              for any of our certifications. Contact us if you need official documentation 
              for your records or have any compliance questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton 
                variant="primary" 
                size="lg"
                className="btn-primary relative overflow-hidden group"
                onClick={() => window.location.href = '/contact'}
              >
                <span className="relative z-10">Contact Us</span>
              </AnimatedButton>
              <AnimatedButton 
                variant="outline" 
                size="lg"
                className="btn-primary bg-white relative overflow-hidden group"
                onClick={() => window.location.href = '/contact'}
              >
                <span className="relative z-10">Request Documentation</span>
              </AnimatedButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Licenses;
