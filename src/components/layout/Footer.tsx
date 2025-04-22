import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/yourgithub',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/yourlinkedin',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/yourtwitter',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      </svg>
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
                EchoOfMe
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
                  href="mailto:your.email@example.com"
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
                  Your Location
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
              <Link to="/privacy" className="text-neutral-500 dark:text-neutral-400 text-sm hover:text-primary dark:hover:text-primary-light transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-neutral-500 dark:text-neutral-400 text-sm hover:text-primary dark:hover:text-primary-light transition-colors">
                Terms of Use
              </Link>
              <span className="text-neutral-400 dark:text-neutral-500 text-sm">
                Built with Next.js & Three.js
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}