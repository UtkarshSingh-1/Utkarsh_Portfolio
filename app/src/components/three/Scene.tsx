import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  PerspectiveCamera,
  Stars,
  Float,
  ContactShadows,
} from '@react-three/drei';
import * as THREE from 'three';
import { useMousePosition } from '@/hooks/useMousePosition';

// Pre-generate random values for particles (outside component to avoid re-render issues)
const PARTICLE_COUNT = 200;
const generateParticleData = () => {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const seeds = new Float32Array(PARTICLE_COUNT);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    // Use seeded random-like values based on index
    const seed1 = Math.sin(i * 12.9898) * 43758.5453;
    const seed2 = Math.sin(i * 78.233) * 43758.5453;
    const seed3 = Math.sin(i * 43.123) * 43758.5453;
    
    positions[i * 3] = ((seed1 - Math.floor(seed1)) - 0.5) * 20;
    positions[i * 3 + 1] = ((seed2 - Math.floor(seed2)) - 0.5) * 20;
    positions[i * 3 + 2] = ((seed3 - Math.floor(seed3)) - 0.5) * 20;

    const colorChoice = (seed1 - Math.floor(seed1));
    if (colorChoice < 0.33) {
      colors[i * 3] = 0;
      colors[i * 3 + 1] = 1;
      colors[i * 3 + 2] = 1;
    } else if (colorChoice < 0.66) {
      colors[i * 3] = 0.7;
      colors[i * 3 + 1] = 0;
      colors[i * 3 + 2] = 1;
    } else {
      colors[i * 3] = 1;
      colors[i * 3 + 1] = 0;
      colors[i * 3 + 2] = 0.5;
    }
    seeds[i] = colorChoice;
  }

  return { positions, colors, seeds };
};

const particleData = generateParticleData();

// Cyber Sphere Component
function CyberSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mouse = useMousePosition();

  // Shader uniforms - stable across renders
  const shaderUniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uColor1: { value: new THREE.Color('#00ffff') },
    uColor2: { value: new THREE.Color('#b400ff') },
    uColor3: { value: new THREE.Color('#ff0080') },
  }), []);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Smooth rotation based on mouse position
    const targetRotationX = mouse.normalizedY * 0.3;
    const targetRotationY = mouse.normalizedX * 0.3;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetRotationX,
      0.05
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetRotationY + state.clock.elapsedTime * 0.1,
      0.05
    );

    // Update shader time uniform
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uMouse.value.set(
        mouse.normalizedX,
        mouse.normalizedY
      );
    }
  });

  const vertexShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      
      vec3 pos = position;
      float distortion = sin(pos.x * 3.0 + uTime) * 0.1;
      distortion += sin(pos.y * 3.0 + uTime * 0.8) * 0.1;
      distortion += sin(pos.z * 3.0 + uTime * 0.6) * 0.1;
      
      pos += normal * distortion * (1.0 + length(uMouse) * 0.5);
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
      vec3 viewDirection = normalize(cameraPosition - vPosition);
      float fresnel = pow(1.0 - dot(viewDirection, vNormal), 3.0);
      
      float pattern = sin(vPosition.x * 10.0 + uTime) * 0.5 + 0.5;
      pattern *= sin(vPosition.y * 10.0 + uTime * 0.8) * 0.5 + 0.5;
      pattern *= sin(vPosition.z * 10.0 + uTime * 0.6) * 0.5 + 0.5;
      
      vec3 color = mix(uColor1, uColor2, pattern);
      color = mix(color, uColor3, fresnel * 0.5);
      
      float grid = step(0.95, sin(vUv.x * 50.0)) + step(0.95, sin(vUv.y * 50.0));
      color += uColor1 * grid * 0.3;
      
      float alpha = 0.6 + fresnel * 0.4;
      
      gl_FragColor = vec4(color, alpha);
    }
  `;

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <mesh ref={meshRef} scale={2}>
        <icosahedronGeometry args={[1, 2]} />
        <shaderMaterial
          ref={materialRef}
          uniforms={shaderUniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Wireframe overlay */}
      <mesh scale={2.05}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#00ffff"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  );
}

// Floating Particles
function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!particlesRef.current) return;
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particleData.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particleData.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Animated Grid Floor
function GridFloor() {
  const gridRef = useRef<THREE.GridHelper>(null);
  const mouse = useMousePosition();

  useFrame((state) => {
    if (!gridRef.current) return;
    
    // Subtle wave effect
    const positions = gridRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const z = positions[i + 2];
      positions[i + 1] = Math.sin(x * 0.5 + state.clock.elapsedTime) * 0.1 +
                         Math.cos(z * 0.5 + state.clock.elapsedTime * 0.8) * 0.1;
    }
    gridRef.current.geometry.attributes.position.needsUpdate = true;

    // Tilt based on mouse
    gridRef.current.rotation.x = THREE.MathUtils.lerp(
      gridRef.current.rotation.x,
      mouse.normalizedY * 0.1,
      0.05
    );
    gridRef.current.rotation.z = THREE.MathUtils.lerp(
      gridRef.current.rotation.z,
      -mouse.normalizedX * 0.1,
      0.05
    );
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[30, 30, '#00ffff', '#1a1a2e']}
      position={[0, -4, 0]}
    />
  );
}

// Camera Controller - separate component to handle camera updates
function CameraController() {
  const mouse = useMousePosition();
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame(() => {
    if (!cameraRef.current) return;
    
    // Subtle camera movement based on mouse
    cameraRef.current.position.x = THREE.MathUtils.lerp(
      cameraRef.current.position.x,
      mouse.normalizedX * 0.5,
      0.02
    );
    cameraRef.current.position.y = THREE.MathUtils.lerp(
      cameraRef.current.position.y,
      2 + mouse.normalizedY * 0.3,
      0.02
    );
    cameraRef.current.lookAt(0, 0, 0);
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 2, 8]}
      fov={60}
    />
  );
}

// Main Scene Component
function SceneContent() {
  return (
    <>
      <CameraController />
      
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff0080" />
      <pointLight position={[0, 10, -10]} intensity={0.5} color="#b400ff" />
      
      {/* Stars background */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0.5}
        fade
        speed={0.5}
      />
      
      {/* Main 3D objects */}
      <CyberSphere />
      <FloatingParticles />
      <GridFloor />
      
      {/* Contact shadows */}
      <ContactShadows
        position={[0, -4, 0]}
        opacity={0.4}
        scale={20}
        blur={2}
        far={4}
      />
    </>
  );
}

// Loading fallback
function SceneLoader() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-8 h-8 border-2 border-cyan border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

// Main export
export function ThreeScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Suspense fallback={<SceneLoader />}>
        <Canvas
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          dpr={[1, 2]}
          style={{ background: 'transparent' }}
        >
          <SceneContent />
        </Canvas>
      </Suspense>
    </div>
  );
}

export default ThreeScene;
