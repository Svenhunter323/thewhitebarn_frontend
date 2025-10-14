import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const IndoorAC = () => {
  return (
    <>
      <Helmet>
        <title>Indoor/AC Venue - The White Barn FL</title>
        <meta name="description" content="Climate-controlled indoor venue spaces at The White Barn FL. Perfect for year-round events with air conditioning and comfort." />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative h-96 bg-gradient-to-r from-green-100 to-green-200 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-serif text-green-900 mb-4">
              Indoor/AC Venue
            </h1>
            <p className="text-xl text-green-800 max-w-2xl mx-auto px-4">
              Climate-controlled comfort for year-round events
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
                We're creating detailed information about our indoor, air-conditioned facilities. 
                This page will showcase our climate-controlled spaces, amenities, and 
                year-round event capabilities.
              </p>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-serif text-green-900 mb-4">
                  Indoor Amenities
                </h3>
                <ul className="text-left space-y-3 text-gray-700">
                  <li>• Climate-controlled environment</li>
                  <li>• Year-round availability</li>
                  <li>• Weather-independent events</li>
                  <li>• Comfortable guest experience</li>
                  <li>• Indoor ceremony options</li>
                  <li>• Reception hall facilities</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default IndoorAC;
