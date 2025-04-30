import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Tesseract component (4D cube projection in 3D)
function Tesseract() {
  const groupRef = useRef<THREE.Group>(null);
  const innerCubeRef = useRef<THREE.Mesh>(null);
  const outerCubeRef = useRef<THREE.Mesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const [hovered, setHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Get viewport from three.js
  const { viewport } = useThree();
  
  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Convert screen coordinates to normalized device coordinates (-1 to +1)
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1 // Fixed inverted Y axis
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Base animation
      const time = clock.getElapsedTime();
      
      // Follow mouse with subtle lag - fixed Y axis direction
      const targetRotationX = -mousePosition.y * 0.5 + Math.sin(time * 0.3) * 0.1; // Negative sign to fix inversion
      const targetRotationY = mousePosition.x * 0.5 + time * 0.1;
      
      // Smooth interpolation for rotation
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
      
      // Scale effect when hovered
      if (innerCubeRef.current && outerCubeRef.current) {
        const targetScale = hovered ? 1.1 : 1.0;
        innerCubeRef.current.scale.x = THREE.MathUtils.lerp(innerCubeRef.current.scale.x, targetScale, 0.1);
        innerCubeRef.current.scale.y = THREE.MathUtils.lerp(innerCubeRef.current.scale.y, targetScale, 0.1);
        innerCubeRef.current.scale.z = THREE.MathUtils.lerp(innerCubeRef.current.scale.z, targetScale, 0.1);
        
        // Make outer cube scale a bit differently for interesting effect
        outerCubeRef.current.scale.x = THREE.MathUtils.lerp(outerCubeRef.current.scale.x, hovered ? 2.1 : 2, 0.1);
        outerCubeRef.current.scale.y = THREE.MathUtils.lerp(outerCubeRef.current.scale.y, hovered ? 2.1 : 2, 0.1);
        outerCubeRef.current.scale.z = THREE.MathUtils.lerp(outerCubeRef.current.scale.z, hovered ? 2.1 : 2, 0.1);
      }
    }
  });

  return (
    <group 
      ref={groupRef} 
      position={[0, 0, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Outer cube */}
      <mesh 
        ref={outerCubeRef} 
        scale={[2, 2, 2]}
      >
        <boxGeometry />
        <meshBasicMaterial 
          color={hovered ? "#f0f0ff" : "#ffffff"} 
          wireframe={true}
          transparent={true}
          opacity={hovered ? 0.8 : 0.6}
        />
      </mesh>

      {/* Inner cube */}
      <mesh 
        ref={innerCubeRef} 
        scale={[1, 1, 1]}
      >
        <boxGeometry />
        <meshBasicMaterial 
          color={hovered ? "#ffffff" : "#f8f8f8"} 
          wireframe={true}
          transparent={true}
          opacity={hovered ? 1 : 0.9}
        />
      </mesh>

      {/* Connection lines between cubes (tesseract effect) */}
      <lineSegments ref={linesRef}>
        <edgesGeometry args={[new THREE.BoxGeometry(3, 3, 3)]} />
        <lineBasicMaterial color="#ffffff" transparent opacity={hovered ? 0.5 : 0.3} />
      </lineSegments>

      {/* Additional connecting lines between vertices */}
      {[
        [1, 1, 1], [1, 1, -1], [1, -1, 1], [1, -1, -1],
        [-1, 1, 1], [-1, 1, -1], [-1, -1, 1], [-1, -1, -1]
      ].map((outerPoint, i) => (
        <group key={i}>
          {[
            [0.5, 0.5, 0.5], [0.5, 0.5, -0.5], [0.5, -0.5, 0.5], [0.5, -0.5, -0.5],
            [-0.5, 0.5, 0.5], [-0.5, 0.5, -0.5], [-0.5, -0.5, 0.5], [-0.5, -0.5, -0.5]
          ].map((innerPoint, j) => (
            <line key={`${i}-${j}`}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  array={new Float32Array([
                    outerPoint[0], outerPoint[1], outerPoint[2],
                    innerPoint[0], innerPoint[1], innerPoint[2]
                  ])}
                  count={2}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#ffffff" transparent opacity={hovered ? 0.4 : 0.2} />
            </line>
          ))}
        </group>
      ))}
    </group>
  );
}

export default function HeroScene() {
  // Custom cursor style for better user experience
  const [cursorStyle, setCursorStyle] = useState<'default' | 'pointer'>('default');

  return (
    <div 
      className="w-full h-full" 
      style={{ cursor: cursorStyle }}
      onMouseEnter={() => setCursorStyle('pointer')}
      onMouseLeave={() => setCursorStyle('default')}
    >
      <Canvas
        gl={{ 
          antialias: true,
          alpha: true, // Ensure transparent background
          powerPreference: "high-performance"
        }}
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]} // Responsive to device pixel ratio
      >
        {/* Minimal lighting to highlight the white tesseract */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.3} />

        {/* Single tesseract with nothing else */}
        <Tesseract />
      </Canvas>
    </div>
  );
}