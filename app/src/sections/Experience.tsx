import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card3D } from '@/components/three/Card3D';
import {
  Briefcase,
  Calendar,
  MapPin,
  Code2,
  CheckCircle2,
} from 'lucide-react';

const experiences = [
  {
    id: 1,
    role: 'Software Development Engineering - Intern',
    company: 'Bluestock Fintech',
    location: 'Remote',
    duration: 'May 2025 - July 2025 (3 months)',
    type: 'Internship',
    description:
      'Spearheaded development of an IPO web platform with production-grade reliability and performance.',
    achievements: [
      'Spearheaded development of IPO web platform serving 5+ concurrent users with 99.5% uptime using Node.js, Express, PostgreSQL',
      'Constructed 40+ UI components delivering responsive HTML, CSS, JavaScript, Bootstrap interface',
      'Accelerated database performance by 35% through query optimization; deployed 15+ REST API endpoints',
      'Directed Git workflow integration and Figma design system adoption across 3-member team',
      'Validated endpoints via Postman; ensured secure, well-documented codebase',
    ],
    tech: [
      'Node.js',
      'Express',
      'PostgreSQL',
      'HTML',
      'CSS',
      'JavaScript',
      'Bootstrap',
      'REST APIs',
      'Postman',
      'Git',
      'Figma',
    ],
    color: 'cyan' as const,
  },
];

const education = [
  {
    degree: 'B.Tech, Computer Science and Engineering',
    institution: 'Pranveer Singh Institute of Technology, Kanpur (AKTU University)',
    duration: 'July 2026',
    description: 'CGPA 7.4+',
    achievements: ['CGPA: 7.4+'],
  },
];

function TimelineItem({
  experience,
  index,
  isInView,
}: {
  experience: (typeof experiences)[0];
  index: number;
  isInView: boolean;
}) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className={`relative flex items-center gap-8 ${isEven ? 'flex-row' : 'flex-row-reverse'
        }`}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
    >
      {/* Timeline dot */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10">
        <motion.div
          className={`w-6 h-6 rounded-full bg-${experience.color} shadow-glow`}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.5 + index * 0.15 }}
        >
          <div className={`w-full h-full rounded-full bg-${experience.color} animate-ping opacity-50`} />
        </motion.div>
      </div>

      {/* Content card */}
      <div className={`w-[calc(50%-40px)] ${isEven ? 'pr-8' : 'pl-8'}`}>
        <Card3D glowColor={experience.color} intensity={10}>
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">{experience.role}</h3>
                <div className="flex items-center gap-2 text-cyan mt-1">
                  <Briefcase className="w-4 h-4" />
                  <span className="font-medium">{experience.company}</span>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium bg-${experience.color}/10 text-${experience.color}`}
              >
                {experience.type}
              </span>
            </div>

            {/* Meta info */}
            <div className="flex flex-wrap gap-4 text-sm text-white/50">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {experience.duration}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {experience.location}
              </div>
            </div>

            {/* Description */}
            <p className="text-white/70 text-sm leading-relaxed">
              {experience.description}
            </p>

            {/* Achievements */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-white/80">Key Achievements:</h4>
              <ul className="space-y-1">
                {experience.achievements.map((achievement, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-2 text-sm text-white/60"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.15 + i * 0.05 }}
                  >
                    <CheckCircle2 className={`w-4 h-4 text-${experience.color} flex-shrink-0 mt-0.5`} />
                    {achievement}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 pt-2">
              {experience.tech.map((tech) => (
                <span
                  key={tech}
                  className={`px-2 py-1 text-xs bg-${experience.color}/10 border border-${experience.color}/20 rounded-md text-${experience.color}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Card3D>
      </div>

      {/* Empty space for other side */}
      <div className="w-[calc(50%-40px)]" />
    </motion.div>
  );
}

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative min-h-screen py-20 md:py-32 overflow-hidden bg-background"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan/5 rounded-full blur-[200px]" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple/5 rounded-full blur-[200px]" />

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
            Experience
          </motion.span>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-white">My Professional </span>
            <span className="gradient-text">Journey</span>
          </motion.h2>
          <motion.p
            className="text-white/60 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Professional experience aligned with my resume
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan via-purple to-magenta -translate-x-1/2" />

          {/* Timeline items */}
          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <TimelineItem
                key={experience.id}
                experience={experience}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>

        {/* Education section */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Education
          </h3>
          <div className="max-w-2xl mx-auto">
            {education.map((edu, index) => (
              <Card3D key={index} glowColor="purple" intensity={8}>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-white">{edu.degree}</h4>
                      <div className="flex items-center gap-2 text-purple mt-1">
                        <Code2 className="w-4 h-4" />
                        <span>{edu.institution}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple/10 text-purple">
                      {edu.duration}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm">{edu.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {edu.achievements.map((achievement) => (
                      <span
                        key={achievement}
                        className="flex items-center gap-1 px-3 py-1 text-xs bg-white/5 rounded-full text-white/70"
                      >
                        <CheckCircle2 className="w-3 h-3 text-purple" />
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Experience;
