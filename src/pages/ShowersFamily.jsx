import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const ShowersFamily = () => {
  return (
    <>
      <Helmet>
        <title>Showers & Family Events - The White Barn FL</title>
        <meta name="description" content="Celebrate life's special moments with baby showers, family reunions, and intimate gatherings at The White Barn FL." />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative h-96 bg-gradient-to-r from-pink-100 to-pink-200 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-serif text-pink-900 mb-4">
              Showers & Family Events
            </h1>
            <p className="text-xl text-pink-800 max-w-2xl mx-auto px-4">
              Celebrate life's precious moments with your loved ones
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
                We're preparing detailed information about our family event services. 
                This page will feature our intimate gathering options, shower packages, 
                and family celebration services.
              </p>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-serif text-pink-900 mb-4">
                  Family Celebrations
                </h3>
                <ul className="text-left space-y-3 text-gray-700">
                  <li>• Baby showers</li>
                  <li>• Bridal showers</li>
                  <li>• Family reunions</li>
                  <li>• Birthday celebrations</li>
                  <li>• Anniversary parties</li>
                  <li>• Graduation parties</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ShowersFamily;
