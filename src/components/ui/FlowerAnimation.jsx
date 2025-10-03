import React from 'react';
import { motion } from 'framer-motion';

const FlowerAnimation = () => {
  // Animation variants
  const bounceY = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      {/* Bouncing flowers */}
      <motion.div 
        className="absolute bottom-[-15px] w-[479px] h-[651px] z-0 md:opacity-100 opacity-20"
        variants={bounceY}
        animate="animate"
      >
        <img 
          src="/images/icons/flowers-13.png" 
          alt="Flower decoration" 
          className="w-full h-full object-contain"
        />
      </motion.div>

      <motion.div 
        className="absolute right-0 bottom-[-15px] w-[524px] h-[715px] z-0 md:opacity-100 opacity-20"
        variants={bounceY}
        animate="animate"
        style={{ animationDelay: '1s' }}
      >
        <img 
          src="/images/icons/flowers-14.png" 
          alt="Flower decoration"
          className="w-full h-full object-contain"
        />
      </motion.div>

    </>
  );
};

export default FlowerAnimation;
