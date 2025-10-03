import { motion } from 'framer-motion';
import clsx from 'clsx';

const AnimatedButton = ({
  children,
  className = '',
  variant = 'primary',
  size = 'default',
  hoverEffect = true,
  fullWidth = false,
  ...props
}) => {
  const baseClasses = 'relative overflow-hidden group font-medium transition-all duration-200';
  
  const variants = {
    primary: 'bg-primary-500 hover:bg-primary-500 text-white',
    secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white',
    outline: 'bg-transparent border-1 border-primary-600 text-primary-600 hover:bg-primary-50',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    default: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <motion.button
      className={clsx(
        baseClasses,
        variants[variant] || variants.primary,
        sizes[size] || sizes.default,
        fullWidth ? 'w-full' : 'w-auto',
        className
      )}
      whileHover={hoverEffect ? { 
        scale: 1.03,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      } : {}}
      whileTap={hoverEffect ? { 
        scale: 0.98,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      } : {}}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 10
      }}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      {hoverEffect && (
        <motion.span 
          className="absolute inset-0 bg-white/20 -left-full group-hover:left-0 transition-all duration-700 ease-in-out z-0"
          initial={{ left: '-100%' }}
        />
      )}
    </motion.button>
  );
};

export default AnimatedButton;
