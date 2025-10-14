import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const Reviews = () => {
  return (
    <>
      <Helmet>
        <title>Reviews - The White Barn FL</title>
        <meta name="description" content="Read reviews and testimonials from our happy clients at The White Barn FL. See what makes our venue special." />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative h-96 bg-gradient-to-r from-purple-100 to-purple-200 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-serif text-purple-900 mb-4">
              Reviews
            </h1>
            <p className="text-xl text-purple-800 max-w-2xl mx-auto px-4">
              What our clients say about The White Barn FL
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
                We're compiling testimonials and reviews from our valued clients. 
                This page will feature client stories, photo galleries from events, 
                and detailed testimonials about their experiences.
              </p>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-serif text-purple-900 mb-4">
                  What You'll Find Here
                </h3>
                <ul className="text-left space-y-3 text-gray-700">
                  <li>• Client testimonials and reviews</li>
                  <li>• Photo galleries from real events</li>
                  <li>• Vendor recommendations</li>
                  <li>• Success stories</li>
                  <li>• Rating and feedback system</li>
                  <li>• Before and after event photos</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Reviews;
