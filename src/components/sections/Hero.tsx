import { motion } from 'framer-motion';
import { SiLeetcode, SiGithub, SiLinkedin } from "react-icons/si";
import HeroScene from '../three/HeroScene';

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
        {/* 3D Scene Area (Left) */}
        <div className="w-full md:w-1/2 h-[500px] mb-10 md:mb-0 relative">
          <div className="absolute inset-0 z-10">
            <HeroScene />
          </div>
        </div>

        {/* Text Area (Right or Center based on design) */}
        <div className="w-full md:w-1/2 text-center md:text-left md:pl-16 z-20">
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
        <a href="https://github.com/Sparkonix11" aria-label="Github" className="text-neutral-400 hover:text-white transition-colors"><SiGithub size={20} /></a>
        <a href="https://leetcode.com/u/Sparkonix/" aria-label="LeetCode" className="text-neutral-400 hover:text-white transition-colors"><SiLeetcode size={20} /></a>
        <a href="https://www.linkedin.com/in/abhishek1102/" aria-label="LinkedIn" className="text-neutral-400 hover:text-white transition-colors"><SiLinkedin size={20} /></a>
      </div>
    </section>
  );
}