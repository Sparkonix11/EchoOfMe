import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Define the sections that will have navigation dots
const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export default function SideNavDots() {
  const [activeSection, setActiveSection] = useState('hero');

  // Handle scroll event to track active section
  useEffect(() => {
    const handleScroll = () => {
      // Find current active section based on scroll position
      const sectionsElements = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;
      
      sectionsElements.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Initial call to set the active section on page load
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden md:block">
      <div className="flex flex-col space-y-4">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="group relative flex items-center"
              aria-label={`Navigate to ${section.label} section`}
            >
              {/* Dot */}
              <motion.div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${isActive ? 'bg-white' : 'bg-neutral-500 group-hover:bg-white/70'}`}
                initial={{ scale: 1 }}
                animate={{ scale: isActive ? 1.2 : 1 }}
                transition={{ duration: 0.2 }}
              />
              
              {/* Label that appears on hover */}
              <div className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="whitespace-nowrap bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {section.label}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}