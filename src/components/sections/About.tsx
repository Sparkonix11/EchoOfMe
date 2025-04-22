import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <section id="about" ref={sectionRef} className="relative min-h-screen py-20 bg-white text-black overflow-hidden flex items-center">
      {/* Background elements - subtle circle in the bottom right */}
      <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-neutral-100 rounded-full opacity-30"></div>

      <div className="container-modern relative z-10">
        <div className="relative">
          {/* Large Vertical Text */} 
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/3 rotate-[-90deg]"
          >
            <h2 className="text-[120px] font-bold text-neutral-100 tracking-widest whitespace-nowrap">
              ABOUT ME
            </h2>
          </motion.div>

          {/* Content Area */} 
          <motion.div
            className="flex flex-col md:flex-row items-start md:pl-32 lg:pl-48"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {/* Image */}
            <motion.div 
              className="w-full md:w-1/3 flex-shrink-0 mb-8 md:mb-0 md:mr-12 lg:mr-16"
              variants={itemVariants}
            >
              {/* Use a rectangular image container as per reference */}
              <div className="relative w-full aspect-[3/4] max-w-xs mx-auto md:mx-0">
                {/* Replace with your actual image */}
                <image
                  src="../assets/profile-placeholder.jpg" // Using relative path without leading slash
                  alt="Abhishek About"
                  className="object-cover filter grayscale"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 320px"
                />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div 
              className="w-full md:w-2/3 text-neutral-700"
              variants={itemVariants}
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-2 text-black uppercase tracking-tight">
                Abhishek
              </h3>
              <p className="text-lg md:text-xl text-neutral-500 mb-6">
                Student.
              </p>
              {/* Placeholder text - replace with actual content */}
              <p className="mb-4 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ipsum massa, hendrerit nec justo ac, luctus euismod sem. Nulla pellentesque dignissim rhoncus. Quisque lacinia mi a nunc interdum, non semper felis dapibus. In hac habitasse platea dictumst. Nunc vitae rhoncus turpis. Aenean laoreet est in orci sagittis, in luctus dolor porta.
              </p>
              <p className="mb-8 leading-relaxed">
                Nunc id hendrerit elit, sit amet efficitur turpis. Duis gravida hendrerit augue a semper. Phasellus ac.
              </p>
              
              {/* Skills/Tools Icons */}
              <div className="flex items-center space-x-4">
                <span className="text-neutral-500 text-sm font-medium">Tools:</span>
                {/* Replace with actual icons/logos */}
                  {/* <SiAdobePhotoshop size={28} className="text-neutral-600 hover:text-black transition-colors" title="Photoshop" />
                  <SiAdobePremierePro size={28} className="text-neutral-600 hover:text-black transition-colors" title="Premiere Pro" />
                  <SiAdobeAfterEffects size={28} className="text-neutral-600 hover:text-black transition-colors" title="After Effects" /> */}
                {/* Add more icons as needed */}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}