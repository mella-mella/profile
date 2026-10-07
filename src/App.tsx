import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import CodingProfiles from './components/CodingProfiles';
import Achievements from './components/Achievements';
import Leadership from './components/Leadership';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SkeletonLoader from './components/SkeletonLoader';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate brief loading for skeleton experience
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="skeleton"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <SkeletonLoader />
        </motion.div>
      ) : (
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="min-h-screen bg-bg-primary"
        >
          <Navbar />
          <main>
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <CodingProfiles />
            <Achievements />
            <Leadership />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
