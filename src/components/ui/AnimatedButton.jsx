import { motion } from 'framer-motion';
import clsx from 'clsx';

const AnimatedButton = ({
  children,
  className = '',
  variant = 'primary',
  size = 'default',
  hoverEffect = true,
  fullWidth = false,
  loading = false,
  disabled = false,
  ...props
}) => {
  const baseClasses = 'relative overflow-hidden group font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Filter out custom props that shouldn't be passed to DOM
  const {
    variant: _variant,
    size: _size,
    hoverEffect: _hoverEffect,
    fullWidth: _fullWidth,
    loading: _loading,
    ...domProps
  } = props;
  
  const isDisabled = disabled || loading;
  
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
      whileHover={hoverEffect && !isDisabled ? { 
        scale: 1.03,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      } : {}}
      whileTap={hoverEffect && !isDisabled ? { 
        scale: 0.98,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      } : {}}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 10
      }}
      disabled={isDisabled}
      {...domProps}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading && (
          <svg 
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            ></circle>
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
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
