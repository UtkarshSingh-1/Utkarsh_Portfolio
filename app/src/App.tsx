import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Components
import { CustomCursor } from '@/components/ui/custom/CustomCursor';
import { Navigation } from '@/components/ui/custom/Navigation';
import { Footer } from '@/components/ui/custom/Footer';

// Sections
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { Skills } from '@/sections/Skills';
import TechStack from './sections/TechStack';
import { HeroScrollDemo } from './components/demo';
import Projects from './sections/Projects';
import Journey from './sections/Journey';
import Experience from './sections/Experience';
import Contact from './sections/Contact';

import Lenis from 'lenis';

// Main App component
function App() {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Synchronize Lenis scrolling with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    // Handle reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      lenis.destroy();
      gsap.globalTimeline.timeScale(0);
    }

    return () => {
      lenis.destroy();
      // Cleanup ScrollTrigger instances on unmount
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main className="relative bg-background">
        {/* Hero Section */}
        <section id="home">
          <Hero />
        </section>

        {/* About Section */}
        <About />

        {/* Skills Section */}
        <Skills />

        {/* Projects Section */}
        <Projects />

        {/* Experience Section */}
        <Experience />

        {/* Journey Section */}
        <Journey />

        {/* Tech Stack Marquee */}
        <TechStack />

        {/* Hero Scroll Animation Demo */}
        <HeroScrollDemo />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Background ambient effects */}
      <div className="fixed inset-0 pointer-events-none z-0 gpu-accelerated">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-cyan/5 rounded-full blur-[80px] animate-pulse will-change-transform" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-purple/5 rounded-full blur-[80px] animate-pulse will-change-transform" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-magenta/3 rounded-full blur-[80px] animate-pulse will-change-transform" style={{ animationDelay: '2s' }} />
      </div>

      {/* Static Noise overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[1] opacity-[0.10]"
        style={{
          backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAUVBMVEWFhYWDg4N3dy95eS95eS95eS95eS95eS95eS95eS95eS95eS95eS95eS95eS95eS95eS95eS95eS95eS95eS95eS95eS95eS95eS95eS95eS95eS95eS+09WVnAAAAGnRSTlMAGDND78/3S9n/R9sfv3fvEv8v/1V8v13v766NOnYAAAADUlEQVR4XoWSwQoTQRCGf0kgICBIVAsKgh6E+v4v5ZCcN8m00mU3v89/fmbvzu00U0kUpUghEAnEAsEAhA+EAkEshAKBv6AfEPoD8on0G+k30m8UPlG8UPBE8UrhQuFDwUKhUChUKhUKhUKhUKhUKhUKhUKP9B4VPvAe8R6VPvA+8B6VPvA+8B6VPlH8RPEThU+UPlH6ROkTpU+UPvAexE/ED8Inkj4In4ifSPogfCJ+UvRE6RP0E/QT6SfoJ9JPpJ9IPlH8RPEThU+UPlH6ROkTpU+UPvAexE/ED8Inkj4In4ifSPogfCJ+UvRE6RP0E/QT6SfoJ9JPpJ9IPlH8RPEThU+UPlH6ROkTpU+UPvAexE/ED8Inkj4In4ifSPogfCJ+UvRE6RP0E/QT6SfoJ9JPpJ9IPlH8RPEThU+UPlH6ROkTpU+UPvAexE/ED8Inkj4In4ifSPogfCJ+UvRE6RP0E/QT6SfoJ9JPpJ9IPlH8RPEThU+UPlH6ROkTpU+UPvAexE/ED8Inkj4In4ifSPogfCJ+UvRE6RP0E/QT6SfoJ9JPpJ9IPlH8RPEThU+UPlH6ROkTpU+UPvAexE/ED8Inkj4In4ifSPogfCJ+UvRE6RP0E/QT6SfoJ9JPpJ9IPlH8RPEThU+UPlH6ROkTpU+UPvAexE/ED8Inkj4In4ifSPogfCJ+UvRE6RP0E/QT6SfoJ9JPpJ9IPlH8RPEThU+UPlH6ROkTpU+UPvAexE/ED8Inkj4In4ifSPogfCJ+UvRE6RP0E/QT6SfoJ9JPpJ9IPlH8RPEThU+UPlH6ROkTpU+UPvAexE/ED8Inkj4In4ifSPogfCJ+UvRE6RP0E/QT6SfoJ9JPpJ9IPlH8RPEThU+UPlH6ROkTpU+UPvAexE/ED8Inkj4In4ifSPogfCJ+UvRE6RP0E/QT6SfoJ9JPpJ9IPlH8RPEThU+UPlH6ROkTpU+UPvAexE/ED8Inkj4In4ifSPogfCJ+UvRE6RP0E/QT6SfoJ9JPpJ9IPlH8RPEThU+UPlH6ROkTpU+UPvAexE/ED8Inkj4In4ifSPogfCJ+UvRE6RP0E/QT6SfoJ9JPpJ9IPlH8RPEThU+UPlH6ROkTlT6ROUTpE6UPvAA7ED8RPpE8oF8InkidSJlI/mBfCD9RfpEvpB+If1E+on0E+kn0k+kn0k+kn0k+kn0k+kn0k+kn0k+kgD9RPpJ9BPpJ9JPpJ9IPpD+F6Nf6P9/E/oBswAAAABJRU5ErkJggg==")`,
          backgroundSize: '100px 100px',
        }}
      />
    </div>
  );
}

export default App;
