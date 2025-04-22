import {Helmet} from "react-helmet";
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';


// Section components
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Contact from './components/sections/Contact';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import SideNavDots from './components/layout/SideNavDots';
import CustomCursor from './components/ui/CustomCursor';
import { ThemeProvider } from './lib/theme-context';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Helmet>
          <title>EchoOfMe | Creative Portfolio</title>
          <meta name="description" content="A portfolio showcasing my journey, skills, and projects as a college student." />
          <meta name="keywords" content="portfolio, college, student, projects, skills, resume" />
          <html lang="en" className="scroll-smooth has-custom-cursor" />
        </Helmet>
        
        <div className="flex flex-col min-h-screen">
          <Header />
          <SideNavDots />
          <main className="flex-grow">
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
          </main>
          <Footer />
        </div>
        <CustomCursor />
      </ThemeProvider>
    </Router>
  );
}

export default App;