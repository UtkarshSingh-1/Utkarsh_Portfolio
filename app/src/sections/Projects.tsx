import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ProjectCard3D } from '@/components/three/Card3D';
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    id: 3,
    title: 'MiniArcade3D',
    description:
      'A premium 3D gaming arcade experience featuring interactive scroll-triggered animations and high-fidelity 3D models. Built with React, Three.js (R3F), and Framer Motion to deliver a seamless, immersive user journey. Optimized for 60fps performance with advanced asset loading and custom shaders.',
    image: '',
    tech: [
      'React',
      'Three.js',
      'React Three Fiber',
      'Framer Motion',
      'Tailwind CSS',
      'TypeScript',
      'Vercel',
    ],
    liveUrl: 'https://miniarcade3d.vercel.app/',
    githubUrl: 'https://github.com/UtkarshSingh-1/miniarcade3D',
    featured: true,
  },
  {
    id: 1,
    title: 'Ashmark',
    description:
      'Developed an end-to-end e-commerce solution managing 100+ products and 50+ SKUs. Built 25+ reusable React components achieving 95% code reusability. Designed a PostgreSQL schema handling 10,000+ records and executed 20+ CRUD operations with <100ms latency. Improved performance with code-splitting and lazy loading; boosted Lighthouse scores to 85+. Deployed on Vercel maintaining 99.8% availability.',
    image: '',
    tech: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Node.js',
      'PostgreSQL',
      'Vercel',
    ],
    liveUrl: 'https://www.ashmark.in',
    githubUrl: 'https://github.com/UtkarshSingh-1/ash_mark',
    featured: true,
  },
  {
    id: 2,
    title: 'AstrobyAB',
    description:
      'Delivered a production-grade astrology platform serving 50+ concurrent users. Implemented NextAuth.js security layer managing 8+ roles with 2-tier access control. Built 40+ responsive UI components using Tailwind CSS, reducing inconsistencies by 80%. Improved PostgreSQL query efficiency with strategic indexing for 60% faster response times. Deployed backend on Railway (99.7% uptime) and frontend on Vercel with 3 environment stages.',
    image: '',
    tech: [
      'Next.js',
      'React',
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'Railway',
      'Vercel',
      'NextAuth.js',
    ],
    liveUrl: 'https://astroby-ab-sy16.vercel.app/',
    githubUrl: 'https://github.com/UtkarshSingh-1/Astroby-AB',
    featured: true,
  },
];

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(
    null
  );

  const scrollToProject = (index: number) => {
    if (!carouselRef.current) return;
    const cardWidth = 420;
    carouselRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
    setActiveIndex(index);
  };

  const handlePrev = () => {
    const newIndex = activeIndex > 0 ? activeIndex - 1 : projects.length - 1;
    scrollToProject(newIndex);
  };

  const handleNext = () => {
    const newIndex = activeIndex < projects.length - 1 ? activeIndex + 1 : 0;
    scrollToProject(newIndex);
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-screen py-20 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple/10 rounded-full blur-[80px]" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-cyan/10 rounded-full blur-[80px]" />

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-1 rounded-full glass text-cyan text-sm font-mono mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Portfolio
          </motion.span>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-white">Featured </span>
            <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.p
            className="text-white/60 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Selected projects from my resume
          </motion.p>
        </motion.div>

        {/* Featured projects highlight */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-wrap justify-center gap-3">
            {projects
              .filter((p) => p.featured)
              .map((project, index) => (
                <motion.button
                  key={project.id}
                  onClick={() => scrollToProject(index)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeIndex === index
                    ? 'bg-cyan text-black'
                    : 'glass text-white/70 hover:text-white'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {project.title}
                </motion.button>
              ))}
          </div>
        </motion.div>

        {/* 3D Carousel */}
        <div className="relative">
          {/* Navigation buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-cyan hover:text-black transition-all"
            data-cursor-text="PREV"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-cyan hover:text-black transition-all"
            data-cursor-text="NEXT"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel container */}
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-16 py-8 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {projects.map((project, index) => (
              <div key={project.id} className="snap-center">
                <ProjectCard3D
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  tech={project.tech}
                  liveUrl={project.liveUrl}
                  githubUrl={project.githubUrl}
                  index={index}
                />
              </div>
            ))}
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-6">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToProject(index)}
                className={`w-2 h-2 rounded-full transition-all ${activeIndex === index
                  ? 'w-8 bg-cyan'
                  : 'bg-white/30 hover:bg-white/50'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Project stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {[
            { value: '5+', label: 'Production Applications' },
            { value: '100+', label: 'Concurrent Users' },
            { value: '30%+', label: 'Performance Improvement' },
            { value: '7.4+', label: 'CGPA' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass rounded-xl p-6 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl font-bold text-cyan text-glow-cyan mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-white/60">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            />
            <motion.div
              className="relative glass-strong rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                ×
              </button>
              <h3 className="text-2xl font-bold text-white mb-4">
                {selectedProject.title}
              </h3>
              <p className="text-white/70 mb-6">{selectedProject.description}</p>
              <div className="flex gap-4">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-cyan text-black rounded-lg hover:bg-cyan/80 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-white/30 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    View Code
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Projects;
