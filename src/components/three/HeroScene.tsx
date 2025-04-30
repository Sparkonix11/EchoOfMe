import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

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

// Background that extends to fill the entire scene
function ExtendedBackground() {
  return (
    <>
      {/* Large background plane */}
      <mesh position={[0, 0, -10]} rotation={[0, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial color="#050505" />
      </mesh>
      
      {/* Particle field for depth */}
      <points>
        <bufferGeometry>
          <float32BufferAttribute
            attach="attributes-position"
            count={1000}
            array={(() => {
              const arr = new Float32Array(3000);
              for (let i = 0; i < 3000; i += 3) {
                arr[i] = (Math.random() - 0.5) * 50;
                arr[i + 1] = (Math.random() - 0.5) * 50;
                arr[i + 2] = (Math.random() - 0.5) * 20 - 10;
              }
              return arr;
            })()}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#ffffff" size={0.03} transparent opacity={0.2} />
      </points>
    </>
  );
}

export default function HeroScene() {
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
        
        {/* Code Galaxy visualization */}
        <CodeGalaxy />
      </Canvas>
    </div>
  );
}