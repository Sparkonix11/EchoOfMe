import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { SiGithub, SiLeetcode, SiLinkedin } from "react-icons/si";

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/sparkonix11',
    icon: (
      <SiGithub />
    ),
  },
  {
    name: 'LeetCode',
    href: 'https://leetcode.com/u/Sparkonix/',
    icon: (
      <SiLeetcode />

    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/abhishek1102',
    icon: (
      <SiLinkedin />
    ),
  },
];

// Animation variants
const footerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.05,
      delayChildren: 0.2
    } 
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 100,
      damping: 15
    }
  }
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
      <div className="container-modern py-16">
        <motion.div 
          className="grid-layout"
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="col-span-12 md:col-span-4 mb-10 md:mb-0">
            <Link to="/" className="inline-block mb-6">
              <span className="text-3xl font-extrabold tracking-tight text-gradient">
                Echo of Me
              </span>
            </Link>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-md">
              A showcase of my journey, skills, and projects as I navigate through my college education and beyond.
            </p>
            <div className="flex space-x-5">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-neutral-500 hover:text-primary dark:text-neutral-400 dark:hover:text-primary-light transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  {item.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="col-span-6 md:col-span-2 mb-8 md:mb-0">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-neutral-900 dark:text-neutral-100">
              Navigation
            </h3>
            <ul className="space-y-4">
              {[
                { name: 'About', path: '/#about' },
                { name: 'Projects', path: '/#projects' },
                { name: 'Skills', path: '/#skills' },
                { name: 'Experience', path: '/#experience' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary-light transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Links */}
          <motion.div variants={itemVariants} className="col-span-6 md:col-span-2 mb-8 md:mb-0">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-neutral-900 dark:text-neutral-100">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="mailto:abhishekbidhan11@gmail.com"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary-light transition-colors"
                >
                  Email Me
                </a>
              </li>
              <li>
                <Link 
                  to="/#contact"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary-light transition-colors"
                >
                  Contact Form
                </Link>
              </li>
              <li>
                <span className="text-neutral-600 dark:text-neutral-400">
                  New Delhi, India
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div variants={itemVariants} className="col-span-12 md:col-span-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-neutral-900 dark:text-neutral-100">
              Stay Updated
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Subscribe to get updates about my latest work and projects
            </p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-neutral-100 dark:bg-neutral-800 border-0 rounded-md px-4 py-2 flex-grow focus:ring-2 focus:ring-primary dark:focus:ring-primary-light focus:outline-none"
                aria-label="Email address"
              />
              <button 
                type="submit" 
                className="btn btn-primary text-sm px-4"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800 grid-layout">
          <div className="col-span-12 flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-4 md:mb-0">
              © {currentYear} EchoOfMe. All rights reserved.
            </p>
            <div className="flex gap-6">
              {/* <Link to="/privacy" className="text-neutral-500 dark:text-neutral-400 text-sm hover:text-primary dark:hover:text-primary-light transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-neutral-500 dark:text-neutral-400 text-sm hover:text-primary dark:hover:text-primary-light transition-colors">
                Terms of Use
              </Link> */}
              <span className="text-neutral-400 dark:text-neutral-500 text-sm">
                Built with React.js & Three.js
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}