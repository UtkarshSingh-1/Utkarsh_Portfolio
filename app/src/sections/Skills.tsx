import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SkillCard3D } from '@/components/three/Card3D';
import {
  Code2,
  Server,
  Database,
  Wrench,
  Layout,
  Smartphone,
  Cloud,
  GitBranch,
  Terminal,
  Layers,
  Box,
  Cpu,
  Figma,
  TestTube,
  Workflow,
  Container,
} from 'lucide-react';

const skillCategories = [
  {
    name: 'Frontend',
    color: 'cyan' as const,
    skills: [
      { name: 'React', icon: Code2, level: 95 },
      { name: 'Next.js', icon: Layout, level: 90 },
      { name: 'TypeScript', icon: Terminal, level: 88 },
      { name: 'Tailwind CSS', icon: Layers, level: 92 },
      { name: 'Three.js', icon: Box, level: 85 },
      { name: 'React Native', icon: Smartphone, level: 80 },
    ],
  },
  {
    name: 'Backend',
    color: 'purple' as const,
    skills: [
      { name: 'Node.js', icon: Server, level: 92 },
      { name: 'Express', icon: Workflow, level: 90 },
      { name: 'Python', icon: Terminal, level: 85 },
      { name: 'GraphQL', icon: Database, level: 78 },
      { name: 'REST APIs', icon: Server, level: 95 },
      { name: 'WebSockets', icon: Cpu, level: 82 },
    ],
  },
  {
    name: 'Databases',
    color: 'magenta' as const,
    skills: [
      { name: 'MongoDB', icon: Database, level: 90 },
      { name: 'PostgreSQL', icon: Database, level: 88 },
      { name: 'Redis', icon: Database, level: 80 },
      { name: 'MySQL', icon: Database, level: 85 },
      { name: 'Firebase', icon: Cloud, level: 82 },
      { name: 'Prisma', icon: Database, level: 85 },
    ],
  },
  {
    name: 'Tools & DevOps',
    color: 'cyan' as const,
    skills: [
      { name: 'Git', icon: GitBranch, level: 92 },
      { name: 'Docker', icon: Container, level: 85 },
      { name: 'AWS', icon: Cloud, level: 80 },
      { name: 'Figma', icon: Figma, level: 88 },
      { name: 'Jest', icon: TestTube, level: 85 },
      { name: 'CI/CD', icon: Workflow, level: 82 },
    ],
  },
];

// Circular progress component
function CircularProgress({
  level,
  color,
}: {
  level: number;
  color: 'cyan' | 'purple' | 'magenta';
}) {
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (level / 100) * circumference;

  const colorClasses = {
    cyan: 'stroke-cyan',
    purple: 'stroke-purple',
    magenta: 'stroke-magenta',
  };

  return (
    <div className="relative w-24 h-24">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="8"
        />
        {/* Progress circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          className={colorClasses[color]}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold text-white">{level}%</span>
      </div>
    </div>
  );
}

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen py-20 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-[200px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple/5 rounded-full blur-[200px]" />

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
            My Skills
          </motion.span>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-white">Technologies I </span>
            <span className="gradient-text">Work With</span>
          </motion.h2>
          <motion.p
            className="text-white/60 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            A comprehensive toolkit built over years of hands-on experience in full-stack
            development
          </motion.p>
        </motion.div>

        {/* Skills grid */}
        <div className="space-y-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + categoryIndex * 0.1 }}
            >
              {/* Category header */}
              <div className="flex items-center gap-4 mb-8">
                <motion.div
                  className={`w-12 h-12 rounded-xl bg-${category.color}/10 flex items-center justify-center`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Wrench className={`w-6 h-6 text-${category.color}`} />
                </motion.div>
                <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                <div className={`flex-1 h-px bg-${category.color}/20`} />
              </div>

              {/* Skills grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.4 + categoryIndex * 0.1 + skillIndex * 0.05,
                    }}
                  >
                    <SkillCard3D
                      name={skill.name}
                      icon={<skill.icon className="w-full h-full" />}
                      level={skill.level}
                      color={category.color}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Overall proficiency */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="glass rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              Overall Proficiency
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Frontend', value: 92, color: 'cyan' as const },
                { label: 'Backend', value: 90, color: 'purple' as const },
                { label: 'Database', value: 88, color: 'magenta' as const },
                { label: 'DevOps', value: 85, color: 'cyan' as const },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center">
                  <CircularProgress level={item.value} color={item.color} />
                  <span className="mt-4 text-white/70 font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;
