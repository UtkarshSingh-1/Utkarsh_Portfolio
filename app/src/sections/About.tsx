import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card3D } from '@/components/three/Card3D';
import { Code2, Database, Globe, GraduationCap, Briefcase } from 'lucide-react';

const highlights = [
  {
    icon: GraduationCap,
    title: 'Education',
    description: 'B.Tech CSE (AKTU University)',
    color: 'cyan' as const,
  },
  {
    icon: Code2,
    title: 'Focus',
    description: 'Scalable System Architecture',
    color: 'purple' as const,
  },
  {
    icon: Briefcase,
    title: 'Experience',
    description: 'SDE Intern at Bluestock Fintech',
    color: 'magenta' as const,
  },
  {
    icon: Database,
    title: 'Stack',
    description: 'React, Next.js, Node.js, PostgreSQL',
    color: 'cyan' as const,
  },
];

const techStack = [
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Express', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'JavaScript', category: 'Language' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Python', category: 'Language' },
  { name: 'Java', category: 'Language' },
  { name: 'SQL', category: 'Language' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'Bootstrap', category: 'Frontend' },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen py-20 md:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple/10 rounded-full blur-[150px]" />

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
            About Me
          </motion.span>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-white">Get to Know </span>
            <span className="gradient-text">Who I Am</span>
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Main content card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Card3D className="h-full" glowColor="cyan" intensity={10}>
              <div className="space-y-6">
                {/* Profile image placeholder */}
                <div className="relative w-32 h-32 mx-auto lg:mx-0">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan via-purple to-magenta animate-rotate-slow" />
                  <div className="absolute inset-1 rounded-full bg-background flex items-center justify-center">
                    <span className="text-4xl font-bold gradient-text">US</span>
                  </div>
                  {/* Orbiting dots */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  >
                    <div className="absolute -top-1 left-1/2 w-3 h-3 bg-cyan rounded-full shadow-glow" />
                  </motion.div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Full-Stack Developer
                  </h3>
                  <p className="text-white/70 leading-relaxed mb-4">
                    Full-stack developer with hands-on experience building 5+ production
                    applications serving 100+ concurrent users. Proficient in React, Next.js,
                    Node.js, PostgreSQL, and cloud infrastructure with 30%+ performance
                    improvements.
                  </p>
                  <p className="text-white/70 leading-relaxed">
                    AKTU Computer Science student (7.4+ GPA) specializing in scalable system
                    architecture.
                  </p>
                </div>

                {/* Tech stack tags */}
                <div>
                  <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech, index) => (
                      <motion.span
                        key={tech.name}
                        className="px-3 py-1.5 text-sm bg-white/5 border border-white/10 rounded-lg text-white/80 hover:border-cyan hover:text-cyan transition-colors cursor-default"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {tech.name}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </Card3D>
          </motion.div>

          {/* Right side - Highlight cards */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <Card3D glowColor={item.color} intensity={12}>
                  <div className="flex flex-col items-center text-center p-2">
                    <motion.div
                      className={`w-12 h-12 rounded-xl bg-${item.color}/10 flex items-center justify-center mb-3`}
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon className={`w-6 h-6 text-${item.color}`} />
                    </motion.div>
                    <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                    <p className="text-white/50 text-sm">{item.description}</p>
                  </div>
                </Card3D>
              </motion.div>
            ))}

            {/* Additional info card */}
            <motion.div
              className="col-span-2"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Card3D glowColor="purple" intensity={8}>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan/20 to-purple/20 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-8 h-8 text-cyan" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">
                      Academic Focus
                    </h4>
                    <p className="text-white/50 text-sm">
                      AKTU Computer Science student specializing in scalable system
                      architecture.
                    </p>
                  </div>
                </div>
              </Card3D>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
