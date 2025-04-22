import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Home', href: '/#hero' },
  { name: 'About', href: '/#about' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Contact', href: '/#contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll event to change header appearance and track active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Find current active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container-modern">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-medium tracking-tight text-white"
            >
              abhishek.
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <ul className="flex items-center space-x-8">
              {navItems.map((item) => {
                // Map navigation item names to section IDs
                const sectionId = item.name.toLowerCase() === 'home' ? 'hero' : item.name.toLowerCase();
                const isActive = activeSection === sectionId;
                
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`relative px-1 py-2 text-sm font-medium transition-colors ${
                        isActive 
                          ? 'text-white' 
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      {item.name}
                      {isActive && (
                        <motion.span 
                          layoutId="activeSection"
                          className="absolute -bottom-1 left-0 w-full h-0.5 bg-white"
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 md:hidden rounded-full hover:bg-neutral-800 transition-colors"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={isMobileMenuOpen ? "open" : "closed"}
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <motion.path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <motion.path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </svg>
              )}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-black border-t border-neutral-800"
        >
          <nav className="container-modern py-6">
            <ul className="flex flex-col space-y-4">
              {navItems.map((item) => {
                // Map navigation item names to section IDs
                const sectionId = item.name.toLowerCase() === 'home' ? 'hero' : item.name.toLowerCase();
                const isActive = activeSection === sectionId;
                
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`block px-1 py-2 text-lg font-medium transition-colors ${
                        isActive 
                          ? 'text-white' 
                          : 'text-neutral-400 hover:text-white'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                      {isActive && (
                        <span className="block w-8 h-0.5 bg-white mt-1"></span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </motion.div>
      )}
    </header>
  );
}