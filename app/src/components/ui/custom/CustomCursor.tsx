import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import gsap from 'gsap';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check for touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Track hoverable elements
    const handleElementHover = () => {
      const hoverables = document.querySelectorAll(
        'a, button, [data-cursor="pointer"], input, textarea, select'
      );

      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          setIsHovering(true);
          const text = el.getAttribute('data-cursor-text');
          if (text) setCursorText(text);
        });
        el.addEventListener('mouseleave', () => {
          setIsHovering(false);
          setCursorText('');
        });
      });
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Initial setup and mutation observer for dynamic elements
    handleElementHover();
    const observer = new MutationObserver(handleElementHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      observer.disconnect();
    };
  }, [cursorX, cursorY]);

  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Main cursor ring */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cyan"
          animate={{
            width: isHovering ? 60 : 40,
            height: isHovering ? 60 : 40,
            scale: isClicking ? 0.9 : 1,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          style={{
            boxShadow: isHovering
              ? '0 0 20px hsl(190 100% 50% / 0.5), 0 0 40px hsl(190 100% 50% / 0.3)'
              : '0 0 10px hsl(190 100% 50% / 0.3)',
          }}
        >
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white uppercase tracking-wider"
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Cursor dot */}
      <motion.div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          className="w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan"
          animate={{
            scale: isClicking ? 0.5 : 1,
            opacity: isHovering ? 0 : 1,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 400 }}
          style={{
            boxShadow: '0 0 10px hsl(190 100% 50% / 0.8)',
          }}
        />
      </motion.div>

      {/* Cursor trail effect */}
      <CursorTrail cursorX={cursorX} cursorY={cursorY} />
    </>
  );
}

function CursorTrail({
  cursorX,
  cursorY,
}: {
  cursorX: ReturnType<typeof useMotionValue<number>>;
  cursorY: ReturnType<typeof useMotionValue<number>>;
}) {
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const trailLength = 5;

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const updateTrail = () => {
      const x = cursorX.get();
      const y = cursorY.get();

      trailRefs.current.forEach((trail, i) => {
        if (!trail) return;
        const delay = (i + 1) * 0.05;
        gsap.to(trail, {
          x: x,
          y: y,
          opacity: 1 - i * 0.15,
          scale: 1 - i * 0.1,
          duration: 0.3,
          delay,
          ease: 'power2.out',
        });
      });
    };

    const unsubscribeX = cursorX.on('change', updateTrail);
    const unsubscribeY = cursorY.on('change', updateTrail);

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [cursorX, cursorY]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {Array.from({ length: trailLength }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailRefs.current[i] = el;
          }}
          className="fixed top-0 left-0 pointer-events-none z-[9998]"
          style={{
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            className="w-1 h-1 rounded-full"
            style={{
              background: `hsl(190 100% 50% / ${0.3 - i * 0.05})`,
              boxShadow: `0 0 ${8 - i}px hsl(190 100% 50% / ${0.4 - i * 0.08})`,
            }}
          />
        </div>
      ))}
    </>
  );
}

export default CustomCursor;
