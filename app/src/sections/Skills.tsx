import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SkillCard3D } from '@/components/three/Card3D';
import {
  Code2,
  Database,
  Wrench,
  GitBranch,
  Terminal,
  Layers,
  Figma,
  Globe,
  Server,
} from 'lucide-react';

const skillCategories = [
  {
    name: 'Languages',
    color: 'cyan' as const,
    skills: [
      { name: 'Python', icon: Terminal },
      { name: 'Java', icon: Code2 },
      { name: 'C', icon: Code2 },
      { name: 'SQL', icon: Database },
      { name: 'JavaScript', icon: Code2 },
      { name: 'TypeScript', icon: Terminal },
    ],
  },
  {
    name: 'Web Development',
    color: 'purple' as const,
    skills: [
      { name: 'HTML', icon: Globe },
      { name: 'CSS', icon: Layers },
      { name: 'React', icon: Code2 },
      { name: 'Next.js', icon: Globe },
      { name: 'Node.js', icon: Server },
      { name: 'Express', icon: Server },
      { name: 'Bootstrap', icon: Layers },
      { name: 'Tailwind CSS', icon: Layers },
      { name: 'REST APIs', icon: Server },
    ],
  },
  {
    name: 'Databases',
    color: 'magenta' as const,
    skills: [
      { name: 'PostgreSQL', icon: Database },
      { name: 'MongoDB', icon: Database },
      { name: 'Oracle', icon: Database },
      { name: 'MySQL', icon: Database },
      { name: 'Prisma ORM', icon: Database },
    ],
  },
  {
    name: 'Tools & Platforms',
    color: 'cyan' as const,
    skills: [
      { name: 'VS Code', icon: Code2 },
      { name: 'Git', icon: GitBranch },
      { name: 'GitHub', icon: GitBranch },
      { name: 'Postman', icon: Server },
      { name: 'Figma', icon: Figma },
      { name: 'Vercel', icon: Globe },
      { name: 'Railway', icon: Globe },
      { name: 'MongoDB Atlas', icon: Database },
    ],
  },
];

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
            Tools and technologies aligned with my academic work and production projects
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
                      color={category.color}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
