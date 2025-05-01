import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Custom hook for responsive positioning
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const updateMatch = () => {
      setMatches(media.matches);
    };
    
    // Set initial value
    updateMatch();
    
    // Setup listeners for screen size changes
    media.addEventListener('change', updateMatch);
    return () => {
      media.removeEventListener('change', updateMatch);
    };
  }, [query]);

  return matches;
}

// CodeGalaxy component - a creative 3D visualization related to coding/development
function CodeGalaxy() {
  const groupRef = useRef<THREE.Group>(null);
  const orbsRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const [hovered, setHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Get viewport from three.js
  const { viewport } = useThree();
  
  // Generate vertices for the "atom" structure
  const atomicStructure = useMemo(() => {
    const vertices = [];
    const orbitCount = 3;
    const pointsPerOrbit = 32;
    
    // Create orbital rings with different orientations
    for (let orbit = 0; orbit < orbitCount; orbit++) {
      const radius = 2.5;
      const angleOffset = Math.PI * 2 / orbitCount * orbit;
      
      // Calculate rotation for this orbital plane
      const rotX = orbit * Math.PI / orbitCount;
      const rotY = orbit * Math.PI / (orbitCount + 1);
      
      // Create points for this orbit
      for (let i = 0; i < pointsPerOrbit; i++) {
        const angle = (i / pointsPerOrbit) * Math.PI * 2;
        
        // Calculate point on circle
        let x = Math.cos(angle) * radius;
        let y = Math.sin(angle) * radius;
        let z = 0;
        
        // Apply rotation to this orbit
        const temp1 = x;
        const temp2 = y;
        x = temp1 * Math.cos(rotX) - z * Math.sin(rotX);
        z = temp1 * Math.sin(rotX) + z * Math.cos(rotX);
        
        const temp3 = y;
        y = temp3 * Math.cos(rotY) - z * Math.sin(rotY);
        z = temp3 * Math.sin(rotY) + z * Math.cos(rotY);
        
        vertices.push(new THREE.Vector3(x, y, z));
      }
    }
    
    return vertices;
  }, []);
  
  // Create connecting lines for the "code network"
  const codeNetwork = useMemo(() => {
    const linePositions = [];
    const connectionCount = 60; // Number of connecting lines
    
    // Generate random connections between points
    for (let i = 0; i < connectionCount; i++) {
      // Origin point
      const x1 = (Math.random() - 0.5) * 5;
      const y1 = (Math.random() - 0.5) * 5;
      const z1 = (Math.random() - 0.5) * 5;
      
      // Destination point - keep it somewhat close to origin for better visual
      const distance = 1 + Math.random() * 2;
      const angle1 = Math.random() * Math.PI * 2;
      const angle2 = Math.random() * Math.PI * 2;
      
      const x2 = x1 + Math.sin(angle1) * Math.cos(angle2) * distance;
      const y2 = y1 + Math.sin(angle1) * Math.sin(angle2) * distance;
      const z2 = z1 + Math.cos(angle1) * distance;
      
      linePositions.push(x1, y1, z1, x2, y2, z2);
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    
    return geometry;
  }, []);
  
  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Convert screen coordinates to normalized device coordinates (-1 to +1)
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Animation frame updates
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const time = clock.getElapsedTime();
      
      // Make the model follow mouse movement with smooth lag
      const targetRotationX = -mousePosition.y * 0.3 + Math.sin(time * 0.3) * 0.1;
      const targetRotationY = mousePosition.x * 0.3 + time * 0.05;
      
      // Smooth rotation transitions
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x, 
        targetRotationX, 
        0.05
      );
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y, 
        targetRotationY, 
        0.05
      );
      
      // Animate orbs
      if (orbsRef.current) {
        const instanceCount = orbsRef.current.count;
        const dummy = new THREE.Object3D();
        
        for (let i = 0; i < instanceCount; i++) {
          // Calculate position along orbital path
          const orbit = Math.floor(i / 5) % 3; // Distribute orbs across 3 orbits
          const angle = (time * 0.2 + i * 0.5) % (Math.PI * 2);
          
          // Base orbit radius
          let radius = 2.5;
          
          // Different orbits have slightly different radii
          if (orbit === 1) radius *= 0.8;
          if (orbit === 2) radius *= 1.2;
          
          // Calculate rotation for this orbital plane
          const rotX = orbit * Math.PI / 3;
          const rotY = orbit * Math.PI / 4;
          
          // Calculate point on circle
          let x = Math.cos(angle) * radius;
          let y = Math.sin(angle) * radius;
          let z = 0;
          
          // Apply rotation to this orbit
          const tempX = x;
          x = tempX * Math.cos(rotX) - z * Math.sin(rotX);
          z = tempX * Math.sin(rotX) + z * Math.cos(rotX);
          
          const tempY = y;
          y = tempY * Math.cos(rotY) - z * Math.sin(rotY);
          z = tempY * Math.sin(rotY) + z * Math.cos(rotY);
          
          // "Data packet" effect - some orbs move along network lines
          if (i % 5 === 0) {
            const lineIndex = (i / 5) % 10;
            const lineProgress = (time * 0.5 + i * 0.1) % 1;
            
            const baseIndex = lineIndex * 6; // 6 values per line (x1,y1,z1,x2,y2,z2)
            const positions = codeNetwork.attributes.position.array;
            
            if (baseIndex < positions.length - 5) {
              const x1 = positions[baseIndex];
              const y1 = positions[baseIndex + 1];
              const z1 = positions[baseIndex + 2];
              const x2 = positions[baseIndex + 3];
              const y2 = positions[baseIndex + 4];
              const z2 = positions[baseIndex + 5];
              
              // Interpolate along the line
              x = x1 + (x2 - x1) * lineProgress;
              y = y1 + (y2 - y1) * lineProgress;
              z = z1 + (z2 - z1) * lineProgress;
            }
          }
          
          // Position and scale the instance
          dummy.position.set(x, y, z);
          dummy.scale.set(
            0.1 + 0.05 * Math.sin(time + i),
            0.1 + 0.05 * Math.sin(time + i),
            0.1 + 0.05 * Math.sin(time + i)
          );
          dummy.updateMatrix();
          
          // Apply matrix to the instanced mesh
          orbsRef.current.setMatrixAt(i, dummy.matrix);
        }
        
        orbsRef.current.instanceMatrix.needsUpdate = true;
      }
    }
  });

  return (
    <group 
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      position={[0, 0, 2]} // Move slightly forward to ensure visibility
    >
      {/* Central "core" - like a CPU or data core */}
      <mesh>
        <octahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial 
          color="#ffffff" 
          wireframe 
          emissive="#ffffff"
          emissiveIntensity={0.5}
          transparent 
          opacity={0.9}
        />
      </mesh>
      
      {/* Secondary layer - representing circuits or connections */}
      <mesh>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial 
          color="#f0f0ff" 
          wireframe 
          emissive="#f0f0ff"
          emissiveIntensity={0.3}
          transparent 
          opacity={hovered ? 0.7 : 0.4}
        />
      </mesh>
      
      {/* Data orbs moving along paths */}
      <instancedMesh 
        ref={orbsRef} 
        args={[undefined, undefined, 30]} // 30 instances
      >
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#ffffff"
          emissiveIntensity={0.8}
          transparent 
          opacity={hovered ? 0.9 : 0.7}
        />
      </instancedMesh>
      
      {/* Network connections - data highways */}
      <lineSegments geometry={codeNetwork}>
        <lineBasicMaterial 
          color="#aaccff" 
          transparent 
          opacity={hovered ? 0.5 : 0.3} 
          linewidth={1}
        />
      </lineSegments>
      
      {/* Binary ring - representing binary data */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3, 0.05, 16, 50]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#ffffff"
          emissiveIntensity={0.5}
          transparent 
          opacity={0.4}
          wireframe
        />
      </mesh>
      
      {/* Pulse effect */}
      <mesh>
        <sphereGeometry args={[4, 16, 16]} />
        <meshStandardMaterial
          color="#3366ff"
          emissive="#3366ff"
          emissiveIntensity={0.2}
          transparent
          opacity={0.05}
          side={THREE.BackSide}
          wireframe
        />
      </mesh>
    </group>
  );
}

// Background that extends to fill the entire scene with animated flowing particles
function ExtendedBackground() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 2000; // Good count for distribution
  
  // Generate particle positions with a wider distribution
  const particlesGeometry = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocity = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      // Position - create a wider, deeper field
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 80;     // wider X spread
      positions[i3 + 1] = (Math.random() - 0.5) * 80; // wider Y spread
      positions[i3 + 2] = (Math.random() - 0.5) * 60 - 15; // deeper Z spread
      
      // Velocity - slower movement for subtler effect
      velocity[i3] = (Math.random() - 0.5) * 0.008;     // X velocity
      velocity[i3 + 1] = (Math.random() - 0.5) * 0.008; // Y velocity
      velocity[i3 + 2] = (Math.random() - 0.5) * 0.004; // Z velocity
      
      // Size - Make particles significantly smaller
      const distanceFromCenter = Math.sqrt(
        Math.pow(positions[i3], 2) + 
        Math.pow(positions[i3 + 1], 2)
      );
      
      // Scale sizes based on distance - use extremely small values
      const sizeVariation = Math.max(0.4, 1 - distanceFromCenter / 80);
      // Make particles much smaller (reduced by multiple orders of magnitude)
      sizes[i] = (Math.random() * 0.00000025 + 0.00000015) * sizeVariation;
      
      // Colors - bright enough to be visible despite tiny size
      const colorIntensity = Math.random() * 0.3 + 0.7; // 0.7 to 1.0
      colors[i3] = colorIntensity;           // Red
      colors[i3 + 1] = colorIntensity;       // Green 
      colors[i3 + 2] = colorIntensity * 1.2; // Blue (enhanced blue tint)
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Store velocity data as a user-defined attribute for animation
    geometry.userData.velocity = velocity;
    
    return geometry;
  }, []);
  
  // Animate the particles
  useFrame(({ clock }) => {
    if (particlesRef.current) {
      const time = clock.getElapsedTime();
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const velocity = particlesRef.current.geometry.userData.velocity as Float32Array;
      const sizes = particlesRef.current.geometry.attributes.size.array as Float32Array;
      
      // Update each particle position and size
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Update positions based on velocity and add some wave-like movement
        positions[i3] += velocity[i3];
        positions[i3 + 1] += velocity[i3 + 1];
        positions[i3 + 2] += velocity[i3 + 2];
        
        // Add subtle wave-like movement (reduced amplitude)
        positions[i3] += Math.sin(time * 0.2 + i * 0.1) * 0.003;
        positions[i3 + 1] += Math.cos(time * 0.15 + i * 0.05) * 0.003;
        
        // "Breathing" effect - subtle size variation with extremely small amplitude
        sizes[i] = (Math.sin(time * 0.3 + i * 0.5) * 0.0000001 + 0.0000005) * 
                   (1 - Math.abs(positions[i3 + 2]) / 60); // Size varies with Z distance
        
        // Boundary check - if a particle goes too far, reset its position
        if (Math.abs(positions[i3]) > 40) {
          positions[i3] = (Math.random() - 0.5) * 80;
          velocity[i3] = (Math.random() - 0.5) * 0.008;
        }
        if (Math.abs(positions[i3 + 1]) > 40) {
          positions[i3 + 1] = (Math.random() - 0.5) * 80;
          velocity[i3 + 1] = (Math.random() - 0.5) * 0.008;
        }
        if (Math.abs(positions[i3 + 2]) > 30) {
          positions[i3 + 2] = (Math.random() - 0.5) * 60 - 15;
          velocity[i3 + 2] = (Math.random() - 0.5) * 0.004;
        }
      }
      
      // Update Three.js that these attributes have changed
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.geometry.attributes.size.needsUpdate = true;
    }
  });
  
  return (
    <>
      {/* Dark background plane */}
      <mesh position={[0, 0, -30]} rotation={[0, 0, 0]}>
        <planeGeometry args={[150, 150]} />
        <meshBasicMaterial color="#050505" />
      </mesh>
      
      {/* Animated particles */}
      <points ref={particlesRef} geometry={particlesGeometry}>
        <pointsMaterial
          size={0.2} // Dramatically reduced size (from 1 to 0.05)
          sizeAttenuation={true}
          transparent={true}
          opacity={0.75} // Increased opacity for more brightness
          vertexColors={true}
          blending={THREE.AdditiveBlending}
          map={(() => {
            // Create a circular texture for perfect circles
            const size = 64;
            const center = size / 2;
            const radius = size / 3; // Smaller radius for sharper dots
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d')!;
            
            // Clear canvas with transparent background (not black)
            ctx.clearRect(0, 0, size, size);
            
            // Create radial gradient for soft circle with sharper falloff
            const gradient = ctx.createRadialGradient(
              center, center, 0,
              center, center, radius
            );
            gradient.addColorStop(0, 'rgba(255, 255, 255, 1)'); // Solid white center
            gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.9)'); // Less fade for reduced blur
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Fully transparent edge
            
            // Draw circle
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(center, center, radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Create texture
            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            return texture;
          })()}
          alphaTest={0.01} // This helps with transparency rendering
          depthWrite={false} // Prevents depth buffer issues with transparent particles
        />
      </points>
      
      {/* Subtle atmospheric glow */}
      <mesh position={[0, 0, -25]}>
        <sphereGeometry args={[40, 32, 32]} />
        <meshBasicMaterial 
          color="#0a1025" 
          side={THREE.BackSide} 
          transparent={true} 
          opacity={0.2}
        />
      </mesh>
    </>
  );
}

export default function HeroScene() {
  // Use media query to determine if we're on mobile
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  return (
    <div className="w-full h-full" style={{ backgroundColor: "#000000" }}> {/* Ensure base div has black background */}
      <Canvas
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 2]}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        {/* Increased light intensity */}
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={1.0} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#aaccff" />
        <pointLight position={[0, 0, 5]} intensity={1.0} color="#ffffff" /> {/* Front-facing light */}
        
        {/* Extended background */}
        <ExtendedBackground />
        
        {/* Code Galaxy visualization - positioned based on screen size */}
        <group position={isMobile ? [0, 0, 0] : [-5, 0, 0]}>
          <CodeGalaxy />
        </group>
      </Canvas>
    </div>
  );
}