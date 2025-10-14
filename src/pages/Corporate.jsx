import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const Corporate = () => {
  return (
    <>
      <Helmet>
        <title>Corporate Events - The White Barn FL</title>
        <meta name="description" content="Host your corporate events, meetings, and business gatherings at The White Barn FL. Professional venue for all your business needs." />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative h-96 bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-serif text-blue-900 mb-4">
              Corporate Events
            </h1>
            <p className="text-xl text-blue-800 max-w-2xl mx-auto px-4">
              Professional venue for your business gatherings
            </p>
          </motion.div>
        </section>

        {/* Content Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <h2 className="text-3xl font-serif text-gray-800 mb-8">
                Coming Soon
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We're developing comprehensive information about our corporate event services. 
                This page will showcase our business meeting facilities, team building options, 
                and professional event packages.
              </p>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-serif text-blue-900 mb-4">
                  Corporate Services
                </h3>
                <ul className="text-left space-y-3 text-gray-700">
                  <li>• Business meetings and conferences</li>
                  <li>• Team building events</li>
                  <li>• Corporate retreats</li>
                  <li>• Product launches</li>
                  <li>• Holiday parties</li>
                  <li>• Networking events</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Corporate;
