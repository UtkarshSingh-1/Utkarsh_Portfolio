import { motion } from 'framer-motion';
import { use3DTilt } from '@/hooks/use3DTilt';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'purple' | 'magenta';
  intensity?: number;
}

export function Card3D({
  children,
  className = '',
  glowColor = 'cyan',
  intensity = 15,
}: Card3DProps) {
  const { ref, style, glareStyle, handlers } = use3DTilt({
    maxTilt: intensity,
    scale: 1.02,
    glare: true,
  });

  const glowColors = {
    cyan: 'shadow-glow hover:shadow-glow-lg',
    purple: 'shadow-glow-purple hover:shadow-[0_0_40px_rgba(180,0,255,0.4)]',
    magenta: 'shadow-glow-magenta hover:shadow-[0_0_40px_rgba(255,0,128,0.4)]',
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={style}
      {...handlers}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`relative h-full glass rounded-2xl p-6 transition-shadow duration-300 ${glowColors[glowColor]}`}
      >
        {/* Glare effect */}
        <div style={glareStyle} className="rounded-2xl" />
        
        {/* Content */}
        <div className="relative z-10">{children}</div>
        
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan/50 rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan/50 rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan/50 rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan/50 rounded-br-lg" />
      </div>
    </motion.div>
  );
}

// 3D Skill Card with icon
interface SkillCard3DProps {
  name: string;
  icon: React.ReactNode;
  level: number;
  color?: 'cyan' | 'purple' | 'magenta';
}

export function SkillCard3D({
  name,
  icon,
  level,
  color = 'cyan',
}: SkillCard3DProps) {
  const { ref, style, glareStyle, handlers, isHovering } = use3DTilt({
    maxTilt: 20,
    scale: 1.05,
    glare: true,
  });

  const colorClasses = {
    cyan: 'text-cyan shadow-glow',
    purple: 'text-purple shadow-glow-purple',
    magenta: 'text-magenta shadow-glow-magenta',
  };

  const progressColors = {
    cyan: 'bg-gradient-to-r from-cyan to-cyan/50',
    purple: 'bg-gradient-to-r from-purple to-purple/50',
    magenta: 'bg-gradient-to-r from-magenta to-magenta/50',
  };

  return (
    <motion.div
      ref={ref}
      className="relative"
      style={style}
      {...handlers}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={`relative glass rounded-xl p-5 transition-all duration-300 ${
          isHovering ? colorClasses[color] : ''
        }`}
      >
        <div style={glareStyle} className="rounded-xl" />
        
        <div className="relative z-10 flex flex-col items-center gap-3">
          {/* Icon */}
          <motion.div
            className={`text-4xl ${colorClasses[color]}`}
            animate={{ rotateY: isHovering ? 360 : 0 }}
            transition={{ duration: 0.6 }}
          >
            {icon}
          </motion.div>
          
          {/* Name */}
          <span className="text-sm font-medium text-white/90">{name}</span>
          
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${progressColors[color]}`}
              initial={{ width: 0 }}
              whileInView={{ width: `${level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
          
          {/* Level text */}
          <span className="text-xs text-white/50">{level}%</span>
        </div>
      </div>
    </motion.div>
  );
}

// 3D Project Card
interface ProjectCard3DProps {
  title: string;
  description: string;
  image?: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  index: number;
}

export function ProjectCard3D({
  title,
  description,
  image,
  tech,
  liveUrl,
  githubUrl,
  index,
}: ProjectCard3DProps) {
  const { ref, style, glareStyle, handlers, isHovering } = use3DTilt({
    maxTilt: 15,
    scale: 1.02,
    glare: true,
  });

  return (
    <motion.div
      ref={ref}
      className="relative flex-shrink-0 w-[350px] md:w-[400px]"
      style={style}
      {...handlers}
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="relative glass rounded-2xl overflow-hidden group">
        <div style={glareStyle} />
        
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-cyan/20 via-purple/20 to-magenta/20 flex items-center justify-center">
              <span className="text-6xl">{title[0]}</span>
            </div>
          )}
          
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovering ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-cyan text-black font-semibold rounded-lg hover:bg-cyan/80 transition-colors"
                data-cursor-text="VIEW"
              >
                Live Demo
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-colors"
                data-cursor-text="CODE"
              >
                GitHub
              </a>
            )}
          </motion.div>
        </div>
        
        {/* Content */}
        <div className="p-5">
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-white/60 text-sm mb-4 line-clamp-2">{description}</p>
          
          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {tech.map((t) => (
              <span
                key={t}
                className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded-md text-cyan"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Card3D;
