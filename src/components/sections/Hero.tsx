import { motion } from 'framer-motion';
import { FaInstagram, FaBehance, FaFacebookF, FaDribbble } from 'react-icons/fa';

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
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

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
      {/* Background elements (circles) */}
      <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-neutral-900 rounded-full opacity-30"></div>
      <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-neutral-900 rounded-full opacity-30"></div>

      {/* Decorative elements (dots, lines) */}
      <div className="absolute top-1/4 left-10 w-32 h-16 grid grid-cols-10 gap-2">
        {Array.from({ length: 50 }).map((_, i) => (
          <span key={i} className={`w-1.5 h-1.5 rounded-full ${i % 3 === 0 ? 'bg-white' : 'bg-neutral-700'}`}></span>
        ))}
      </div>
      {/* Vertical line left */}
      <div className="absolute top-1/2 left-10 w-0.5 h-1/4 bg-neutral-700 transform -translate-y-1/2"></div>


      {/* Main Content Area */}
      <div className="container-modern relative z-10 flex flex-col md:flex-row items-center">
        {/* Image Area (Left or Center based on design) */}
        <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
          {/* Profile Image */} 
          <image 
            src="../assets/profile-placeholder.jpg" // Using relative path without leading slash
            alt="Abhishek" 
            width={500}
            height={700}
            className="object-cover filter grayscale contrast-125" 
            priority
          />
        </div>

        {/* Text Area (Right or Center based on design) */}
        <div className="w-full md:w-1/2 text-center md:text-left md:pl-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 uppercase"
            >
              Abhishek
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-neutral-400 tracking-wide"
            >
              Code. Create. Collaborate.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Social Icons Bottom Right */}
      <div className="absolute bottom-10 right-10 z-20 flex space-x-4">
        {/* Replace # with actual links */}
        <a href="#" aria-label="Instagram" className="text-neutral-400 hover:text-white transition-colors"><FaInstagram size={20} /></a>
        <a href="#" aria-label="Behance" className="text-neutral-400 hover:text-white transition-colors"><FaBehance size={20} /></a>
        <a href="#" aria-label="Facebook" className="text-neutral-400 hover:text-white transition-colors"><FaFacebookF size={20} /></a>
        <a href="#" aria-label="Dribbble" className="text-neutral-400 hover:text-white transition-colors"><FaDribbble size={20} /></a>
      </div>
    </section>
  );
}