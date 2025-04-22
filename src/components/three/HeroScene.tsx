import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Text, 
  Stars, 
  Float, 
  Cloud,
  MeshDistortMaterial
} from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';

function FloatingText() {
  const textRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2 + 0.2;
      textRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <Text
        ref={textRef}
        position={[0, 0.2, 0]}
        fontSize={0.8}
        color="#3b82f6" // blue-500
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        outlineWidth={0.02}
        outlineColor="#1e40af" // blue-800
        fillOpacity={0.8}
      >
        EchoOfMe
        <meshStandardMaterial 
          attach="material" 
          color="#4facfe"
          emissive="#4242ff"
          emissiveIntensity={0.5}
          toneMapped={false}
        />
      </Text>
    </Float>
  );
}

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
      
      if (hovered) {
        meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, 1.2, 0.1);
        meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, 1.2, 0.1);
        meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, 1.2, 0.1);
      } else {
        meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, 1.0, 0.1);
        meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, 1.0, 0.1);
        meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, 1.0, 0.1);
      }
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      position={[0, 0, -2]} 
      castShadow
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <icosahedronGeometry args={[1.5, 5]} />
      <MeshDistortMaterial
        color="#8b5cf6" // purple-500
        roughness={0.1}
        metalness={0.8}
        bumpScale={0.005}
        clearcoat={1}
        clearcoatRoughness={0.4}
        radius={1}
        distort={hovered ? 0.6 : 0.3}
        speed={5}
      />
    </mesh>
  );
}

function FloatingParticles() {
  return (
    <Stars 
      radius={100} 
      depth={50} 
      count={5000} 
      factor={4} 
      saturation={0.5} 
      fade 
      speed={1}
    />
  );
}

function FloatingIcons() {
  const groupRef = useRef<THREE.Group>(null);
  const iconPositions = useMemo(() => [
    [-3, -1, 0],
    [3, -2, 1],
    [-2, 2, -1],
    [3, 2, 0],
  ], []);
  
  useFrame(({ clock, mouse }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        mouse.x * 0.5,
        0.05
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        mouse.y * 0.5,
        0.05
      );
    }
  });
  
  return (
    <group ref={groupRef}>
      {iconPositions.map((position, index) => (
        <Float 
          key={index} 
          position={position as [number, number, number]} 
          speed={1.5} 
          rotationIntensity={2} 
          floatIntensity={2}
        >
          <mesh castShadow>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial 
              color={index % 2 === 0 ? '#3b82f6' : '#8b5cf6'} 
              emissive={index % 2 === 0 ? '#3b82f6' : '#8b5cf6'}
              emissiveIntensity={0.4}
              toneMapped={false}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function AtmosphericClouds() {
  return (
    <group position={[0, 0, -10]}>
      <Cloud 
        opacity={0.3}
        speed={0.4} 
        segments={20} 
        position={[-4, 2, 0]} 
      />
      <Cloud 
        opacity={0.3}
        speed={0.2} 
        segments={15} 
        position={[4, -2, 1]} 
      />
    </group>
  );
}

function AnimatedCamera({ scrollPosition }: { scrollPosition: number }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  
  useFrame(() => {
    if (cameraRef.current) {
      // Smooth camera movement based on scroll
      const targetZ = 5 - scrollPosition * 0.01;
      cameraRef.current.position.z = THREE.MathUtils.lerp(
        cameraRef.current.position.z, 
        Math.max(3, targetZ), 
        0.05
      );
      // Slight tilt based on mouse position
      cameraRef.current.rotation.x = THREE.MathUtils.lerp(
        cameraRef.current.rotation.x,
        scrollPosition * 0.0002,
        0.05
      );
    }
  });
  
  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 5]} fov={50} />;
}

function GradientBackground() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current && meshRef.current.material) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = clock.getElapsedTime() * 0.2;
    }
  });

  // Enhanced gradient shader with more dynamic patterns
  const gradientShader = {
    uniforms: {
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color('#3b82f6') }, // blue-500
      uColorB: { value: new THREE.Color('#8b5cf6') }, // purple-500
      uColorC: { value: new THREE.Color('#0f172a') }, // slate-900
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      uniform vec3 uColorC;
      varying vec2 vUv;
      
      //	Classic Perlin 3D Noise by Stefan Gustavson
      vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
      vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
      vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
      
      float cnoise(vec3 P){
        vec3 Pi0 = floor(P);
        vec3 Pi1 = Pi0 + vec3(1.0);
        Pi0 = mod(Pi0, 289.0);
        Pi1 = mod(Pi1, 289.0);
        vec3 Pf0 = fract(P);
        vec3 Pf1 = Pf0 - vec3(1.0);
        vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
        vec4 iy = vec4(Pi0.yy, Pi1.yy);
        vec4 iz0 = Pi0.zzzz;
        vec4 iz1 = Pi1.zzzz;
      
        vec4 ixy = permute(permute(ix) + iy);
        vec4 ixy0 = permute(ixy + iz0);
        vec4 ixy1 = permute(ixy + iz1);
      
        vec4 gx0 = ixy0 / 7.0;
        vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
        gx0 = fract(gx0);
        vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
        vec4 sz0 = step(gz0, vec4(0.0));
        gx0 -= sz0 * (step(0.0, gx0) - 0.5);
        gy0 -= sz0 * (step(0.0, gy0) - 0.5);
      
        vec4 gx1 = ixy1 / 7.0;
        vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
        gx1 = fract(gx1);
        vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
        vec4 sz1 = step(gz1, vec4(0.0));
        gx1 -= sz1 * (step(0.0, gx1) - 0.5);
        gy1 -= sz1 * (step(0.0, gy1) - 0.5);
      
        vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
        vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
        vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
        vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
        vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
        vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
        vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
        vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
      
        vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
        g000 *= norm0.x;
        g010 *= norm0.y;
        g100 *= norm0.z;
        g110 *= norm0.w;
        vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
        g001 *= norm1.x;
        g011 *= norm1.y;
        g101 *= norm1.z;
        g111 *= norm1.w;
      
        float n000 = dot(g000, Pf0);
        float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
        float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
        float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
        float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
        float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
        float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
        float n111 = dot(g111, Pf1);
      
        vec3 fade_xyz = fade(Pf0);
        vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
        vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
        float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
        return 2.2 * n_xyz;
      }
      
      void main() {
        // Perlin noise for creating more organic patterns
        float noise1 = cnoise(vec3(vUv * 5.0, uTime * 0.1));
        float noise2 = cnoise(vec3(vUv * 10.0, uTime * 0.2 + 100.0));
        
        // Create flowing gradient effect
        vec2 distortedUV = vUv + vec2(
          0.05 * sin(vUv.y * 10.0 + uTime),
          0.05 * cos(vUv.x * 10.0 + uTime)
        );
        
        // Blend colors based on position and noise
        float blend1 = smoothstep(0.0, 1.0, distortedUV.y + noise1 * 0.2);
        float blend2 = smoothstep(0.0, 1.0, distortedUV.x + noise2 * 0.2);
        
        vec3 color1 = mix(uColorC, uColorA, blend1);
        vec3 color2 = mix(uColorC, uColorB, blend2);
        vec3 finalColor = mix(color1, color2, 0.5 + 0.5 * sin(uTime * 0.2));
        
        // Add subtle highlights
        float highlight = pow(noise1 * noise2, 3.0) * 0.5;
        finalColor += highlight * 0.3;
        
        gl_FragColor = vec4(finalColor, 0.95);
      }
    `,
  };

  return (
    <mesh ref={meshRef} position={[0, 0, -5]} scale={[15, 15, 1]}>
      <planeGeometry />
      <shaderMaterial 
        attach="material"
        args={[gradientShader]}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export default function HeroScene() {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="h-screen w-full">
      <Canvas
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]} // Responsive to device pixel ratio
      >
        <AnimatedCamera scrollPosition={scrollPosition} />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
        <pointLight position={[-10, -10, 5]} intensity={0.5} color="#8b5cf6" />
        <spotLight 
          position={[0, 5, 5]} 
          angle={0.3} 
          penumbra={1} 
          intensity={0.8} 
          castShadow
          color="#3b82f6"
        />
        
        <GradientBackground />
        <FloatingParticles />
        <AtmosphericClouds />
        <AnimatedSphere />
        <FloatingIcons />
        <FloatingText />
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.3}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.5}
          enableDamping
          dampingFactor={0.05}
        />
        
        <EffectComposer>
          <Bloom 
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            intensity={0.8}
          />
          <ChromaticAberration 
            offset={[0.002, 0.002]} 
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}