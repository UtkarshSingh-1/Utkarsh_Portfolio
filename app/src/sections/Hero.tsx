import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ThreeScene } from '@/components/three/Scene';
import { ChevronDown, Download, Briefcase } from 'lucide-react';
import gsap from 'gsap';

// Typing animation component
function TypeWriter({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index <= text.length) {
          setDisplayText(text.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
        }
      }, 50);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span className="relative">
      {displayText}
      {!isComplete && (
        <motion.span
          className="inline-block w-[3px] h-[1em] bg-cyan ml-1 align-middle"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
    </span>
  );
}

// Animated gradient text
function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative">
      <span className="bg-gradient-to-r from-cyan via-purple to-magenta bg-clip-text text-transparent">
        {children}
      </span>
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-cyan via-purple to-magenta bg-clip-text text-transparent blur-lg opacity-50"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {children}
      </motion.span>
    </span>
  );
}

// 3D Button component
interface IconProps {
  className?: string;
}

function Button3D({
  children,
  variant = 'primary',
  onClick,
  icon: Icon,
  href,
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  icon?: React.ComponentType<IconProps>;
  href?: string;
}) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const btn = buttonRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    gsap.to(btn, {
      rotateX: -rotateX,
      rotateY: -rotateY,
      transformPerspective: 500,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    const btn = buttonRef.current;
    if (!btn) return;

    gsap.to(btn, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  const baseClasses =
    'relative px-8 py-4 rounded-xl font-semibold text-sm uppercase tracking-wider transition-all duration-300 transform-gpu';

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-cyan to-cyan/80 text-black hover:shadow-glow-lg hover:scale-105',
    secondary:
      'border-2 border-white/20 text-white hover:border-cyan hover:text-cyan hover:shadow-glow backdrop-blur-sm',
  };

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {Icon ? <Icon className="w-5 h-5" /> : null}
        {children}
      </span>
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
        initial={{ x: '-200%' }}
        whileHover={{ x: '200%' }}
        transition={{ duration: 0.6 }}
      />
    </>
  );

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={`${baseClasses} ${variantClasses[variant]} inline-block`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        data-cursor-text="CLICK"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor-text="CLICK"
    >
      {content}
    </button>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background Scene */}
      <ThreeScene />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
        style={{ opacity, scale, y }}
      >
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-cyan text-sm font-mono">
            <span className="w-2 h-2 bg-cyan rounded-full animate-pulse" />
            Available for freelance work
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="text-white">Hi, I&apos;m </span>
          <GradientText>Utkarsh Singh</GradientText>
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          className="text-xl sm:text-2xl md:text-3xl text-white/80 mb-6 font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <TypeWriter text="Full Stack Developer & Freelancer" delay={800} />
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto mb-10 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          I build immersive, scalable, and 3D-powered web experiences
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <Button3D href="#projects" icon={Briefcase} variant="primary">
            View Projects
          </Button3D>
          <Button3D href="#contact" icon={Download} variant="secondary">
            Hire Me
          </Button3D>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          {[
            { value: '2+', label: 'Years Experience' },
            { value: '10+', label: 'Projects Completed' },
            { value: '5+', label: 'Happy Clients' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}
            >
              <div className="text-2xl sm:text-3xl font-bold text-cyan text-glow-cyan">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-white/50 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-2 text-white/40 hover:text-cyan transition-colors"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          data-cursor-text="SCROLL"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.a>
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-cyan/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-purple/5 rounded-full blur-[150px]" />
      </div>
    </section>
  );
}

export default Hero;
