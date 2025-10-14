import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaChevronDown } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const handleDropdownToggle = (itemName) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  const handleMouseEnter = (itemName) => {
    setActiveDropdown(itemName);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const isActiveRoute = (item) => {
    if (item.path) {
      return location.pathname === item.path;
    }
    if (item.dropdown) {
      return item.dropdown.some(subItem => location.pathname === subItem.path);
    }
    return false;
  };

  const navItems = [
    { name: 'Home', path: '/' },
    {
      name: 'Events',
      dropdown: [
        { name: 'Weddings', path: '/weddings' },
        { name: 'Corporate', path: '/corporate' },
        { name: 'Showers & Family', path: '/showers-family' },
      ]
    },
    {
      name: 'Venue',
      dropdown: [
        { name: 'Indoor/AC', path: '/indoor-ac' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Videos', path: '/videos' },
      ]
    },
    { name: 'Reviews', path: '/reviews' },
    {
      name: 'About',
      dropdown: [
        { name: 'About Us', path: '/about' },
        { name: 'Licenses & Accreditations', path: '/licenses' },
        { name: 'Associations We Believe In', path: '/associations' },
      ]
    },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-sm shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-2 z-50"
            >
              <div className="logo">
                <img 
                  src="images/logo.png" 
                  alt="The White Barn FL Logo" 
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    width: '200px'
                  }}
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.dropdown && handleMouseEnter(item.name)}
                  onMouseLeave={() => item.dropdown && handleMouseLeave()}
                >
                  {item.dropdown ? (
                    <>
                      <button
                        className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center space-x-1 ${
                          isActiveRoute(item)
                            ? isScrolled 
                              ? 'text-amber-600' 
                              : 'text-amber-900'
                            : isScrolled 
                              ? 'text-gray-700 hover:text-amber-600' 
                              : 'text-black hover:text-amber-900'
                        }`}
                      >
                        <span>{item.name}</span>
                        <FaChevronDown className="h-3 w-3" />
                        {isActiveRoute(item) && (
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-current"
                            layoutId="activeTab"
                            initial={false}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        )}
                      </button>
                      
                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {activeDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                          >
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.path}
                                className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                                  location.pathname === subItem.path
                                    ? 'text-amber-600 bg-amber-50'
                                    : 'text-gray-700 hover:text-amber-600 hover:bg-gray-50'
                                }`}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                        location.pathname === item.path
                          ? isScrolled 
                            ? 'text-amber-600' 
                            : 'text-amber-900'
                          : isScrolled 
                            ? 'text-gray-700 hover:text-amber-600' 
                            : 'text-black hover:text-amber-900'
                      }`}
                    >
                      {item.name}
                      {location.pathname === item.path && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-current"
                          layoutId="activeTab"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-3 rounded-md transition-colors z-50 ${
                isScrolled || isOpen
                  ? 'text-gray-700 hover:text-amber-600' 
                  : 'text-black hover:text-amber-300'
              }`}
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <div className="w-7 h-7 relative flex items-center justify-center">
                <span
                  className={`absolute block h-0.5 w-7 bg-current transform transition duration-300 ease-in-out ${
                    isOpen ? 'rotate-45' : '-translate-y-1.5'
                  }`}
                />
                <span
                  className={`absolute block h-0.5 w-7 bg-current transform transition duration-200 ease-in-out ${
                    isOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute block h-0.5 w-7 bg-current transform transition duration-300 ease-in-out ${
                    isOpen ? '-rotate-45' : 'translate-y-1.5'
                  }`}
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 w-full max-w-xs h-full bg-white shadow-xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <Link to="/" onClick={() => setIsOpen(false)}>
                    <img 
                      src="images/logo.png" 
                      alt="The White Barn FL Logo"
                      className="h-12 w-auto"
                    />
                  </Link>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes className="h-6 w-6" />
                  </button>
                </div>

                <nav className="mb-8">
                  <ul className="space-y-2">
                    {navItems.map((item) => (
                      <li key={item.name}>
                        {item.dropdown ? (
                          <div>
                            <button
                              onClick={() => handleDropdownToggle(item.name)}
                              className={`w-full flex items-center justify-between px-4 py-2 text-lg font-medium text-left ${
                                isActiveRoute(item)
                                  ? 'text-amber-600'
                                  : 'text-gray-800 hover:text-amber-600'
                              }`}
                            >
                              <span>{item.name}</span>
                              <FaChevronDown 
                                className={`h-4 w-4 transition-transform duration-200 ${
                                  activeDropdown === item.name ? 'rotate-180' : ''
                                }`} 
                              />
                            </button>
                            <AnimatePresence>
                              {activeDropdown === item.name && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <ul className="pl-4 pt-2 space-y-1">
                                    {item.dropdown.map((subItem) => (
                                      <li key={subItem.name}>
                                        <Link
                                          to={subItem.path}
                                          onClick={() => setIsOpen(false)}
                                          className={`block px-4 py-2 text-base ${
                                            location.pathname === subItem.path
                                              ? 'text-amber-600 bg-amber-50 rounded'
                                              : 'text-gray-700 hover:text-amber-600'
                                          }`}
                                        >
                                          {subItem.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <Link
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className={`block px-4 py-2 text-lg font-medium ${
                              location.pathname === item.path
                                ? 'text-amber-600'
                                : 'text-gray-800 hover:text-amber-600'
                            }`}
                          >
                            {item.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="border-t border-gray-200 pt-6">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-amber-600">
                        <FaPhoneAlt className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-500">Call Now</p>
                        <a href="tel:+9543241474" className="text-base text-gray-900">(954) 324-1474</a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-amber-600">
                        <FaEnvelope className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-500">Email Us</p>
                        <a href="mailto:info@thewhitebarnfl.com" className="text-base text-gray-900">info@thewhitebarnfl.com</a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-amber-600">
                        <FaMapMarkerAlt className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-500">Location</p>
                        <p className="text-base text-gray-900">4680 Volunteer road<br />SW Ranches, FL 33330</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-sm font-medium text-gray-500 mb-3">Follow Us</p>
                    <div className="flex space-x-4">
                      <a href="#" className="text-gray-600 hover:text-amber-600">
                        <span className="sr-only">Facebook</span>
                        <FaFacebookF className="h-6 w-6" />
                      </a>
                      <a href="#" className="text-gray-600 hover:text-amber-600">
                        <span className="sr-only">Instagram</span>
                        <FaInstagram className="h-6 w-6" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
