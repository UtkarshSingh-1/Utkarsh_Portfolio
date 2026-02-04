import { useRef, useState, useCallback, useEffect } from 'react';

interface TiltValues {
  rotateX: number;
  rotateY: number;
  scale: number;
}

interface Use3DTiltOptions {
  maxTilt?: number;
  scale?: number;
  perspective?: number;
  speed?: number;
  glare?: boolean;
}

export function use3DTilt(options: Use3DTiltOptions = {}) {
  const {
    maxTilt = 15,
    scale = 1.02,
    perspective = 1000,
    speed = 400,
    glare = true,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [tiltValues, setTiltValues] = useState<TiltValues>({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const rotateX = (mouseY / (rect.height / 2)) * -maxTilt;
      const rotateY = (mouseX / (rect.width / 2)) * maxTilt;

      setTiltValues({
        rotateX: Math.max(-maxTilt, Math.min(maxTilt, rotateX)),
        rotateY: Math.max(-maxTilt, Math.min(maxTilt, rotateY)),
        scale,
      });

      if (glare) {
        const glareX = ((e.clientX - rect.left) / rect.width) * 100;
        const glareY = ((e.clientY - rect.top) / rect.height) * 100;
        setGlarePosition({ x: glareX, y: glareY });
      }
    },
    [maxTilt, scale, glare]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setTiltValues({ rotateX: 0, rotateY: 0, scale: 1 });
    setGlarePosition({ x: 50, y: 50 });
  }, []);

  const style: React.CSSProperties = {
    transform: `perspective(${perspective}px) rotateX(${tiltValues.rotateX}deg) rotateY(${tiltValues.rotateY}deg) scale3d(${tiltValues.scale}, ${tiltValues.scale}, ${tiltValues.scale})`,
    transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
    transformStyle: 'preserve-3d',
  };

  const glareStyle: React.CSSProperties = glare
    ? {
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
        pointerEvents: 'none',
        opacity: isHovering ? 1 : 0,
        transition: 'opacity 300ms ease',
      }
    : {};

  return {
    ref,
    style,
    glareStyle,
    tiltValues,
    isHovering,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
}

export function useMagneticEffect(strength: number = 0.3) {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      const maxDistance = 150;

      if (distance < maxDistance) {
        const factor = (1 - distance / maxDistance) * strength;
        setPosition({
          x: distanceX * factor,
          y: distanceY * factor,
        });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return { ref, position };
}
