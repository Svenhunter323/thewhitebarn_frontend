import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const Weddings = () => {
  return (
    <>
      <Helmet>
        <title>Weddings - The White Barn FL</title>
        <meta name="description" content="Beautiful wedding ceremonies and receptions at The White Barn FL. Create your perfect wedding day in our stunning venue." />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative h-96 bg-gradient-to-r from-amber-100 to-amber-200 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-serif text-amber-900 mb-4">
              Weddings
            </h1>
            <p className="text-xl text-amber-800 max-w-2xl mx-auto px-4">
              Your dream wedding awaits at The White Barn FL
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
                We're working on bringing you detailed information about our wedding services. 
                This page will feature our wedding packages, ceremony options, and everything 
                you need to plan your perfect day.
              </p>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-serif text-amber-900 mb-4">
                  What to Expect
                </h3>
                <ul className="text-left space-y-3 text-gray-700">
                  <li>• Wedding ceremony packages</li>
                  <li>• Reception venue options</li>
                  <li>• Catering and menu selections</li>
                  <li>• Photography and videography services</li>
                  <li>• Decoration and floral arrangements</li>
                  <li>• Wedding planning assistance</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Weddings;
