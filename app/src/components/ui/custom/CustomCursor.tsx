import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import gsap from 'gsap';

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 500 };
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

    // Event delegation for performance
    const handleOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a, button, [data-cursor="pointer"], input, textarea, select, [data-cursor-text]');
      if (target) {
        setIsHovering(true);
        const text = target.getAttribute('data-cursor-text');
        if (text) setCursorText(text);
      }
    };

    const handleOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a, button, [data-cursor="pointer"], input, textarea, select, [data-cursor-text]');
      if (target) {
        setIsHovering(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleOver);
    window.addEventListener('mouseout', handleOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleOver);
      window.removeEventListener('mouseout', handleOut);
    };
  }, [cursorX, cursorY]);

  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Brackets */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          {/* Top Left */}
          <motion.div
            className="absolute -top-4 -left-4 w-2 h-2 border-t border-l border-cyan/50"
            animate={{ x: isHovering ? -4 : 0, y: isHovering ? -4 : 0, opacity: isHovering ? 1 : 0.5 }}
          />
          {/* Top Right */}
          <motion.div
            className="absolute -top-4 -right-4 w-2 h-2 border-t border-r border-cyan/50"
            animate={{ x: isHovering ? 4 : 0, y: isHovering ? -4 : 0, opacity: isHovering ? 1 : 0.5 }}
          />
          {/* Bottom Left */}
          <motion.div
            className="absolute -bottom-4 -left-4 w-2 h-2 border-b border-l border-cyan/50"
            animate={{ x: isHovering ? -4 : 0, y: isHovering ? 4 : 0, opacity: isHovering ? 1 : 0.5 }}
          />
          {/* Bottom Right */}
          <motion.div
            className="absolute -bottom-4 -right-4 w-2 h-2 border-b border-r border-cyan/50"
            animate={{ x: isHovering ? 4 : 0, y: isHovering ? 4 : 0, opacity: isHovering ? 1 : 0.5 }}
          />

          {cursorText && (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 20 }}
              className="absolute left-1/2 -translate-x-1/2 text-[10px] font-mono text-cyan whitespace-nowrap tracking-widest uppercase"
            >
              {cursorText}
            </motion.span>
          )}
        </div>
      </motion.div>

      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          className="w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_10px_rgba(34,211,238,0.8)]"
          animate={{
            scale: isClicking ? 0.6 : 1,
            opacity: isHovering ? 0.8 : 1,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 400 }}
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
  cursorX: any;
  cursorY: any;
}) {
  const trailLength = 4;

  return (
    <>
      {Array.from({ length: trailLength }).map((_, i) => (
        <CursorTrailPoint
          key={i}
          index={i}
          cursorX={cursorX}
          cursorY={cursorY}
        />
      ))}
    </>
  );
}

function CursorTrailPoint({ index, cursorX, cursorY }: { index: number, cursorX: any, cursorY: any }) {
  const delay = (index + 1) * 0.05;
  const springConfig = { damping: 20 + index * 2, stiffness: 200 - index * 20 };

  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9998]"
      style={{
        x,
        y,
        opacity: 0.3 - index * 0.05,
        scale: 1 - index * 0.1,
      }}
    >
      <div
        className="w-1 h-1 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "hsl(190 100% 50%)",
          boxShadow: `0 0 ${8 - index}px hsl(190 100% 50% / 0.8)`,
        }}
      />
    </motion.div>
  );
}

export default CustomCursor;
