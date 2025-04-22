import { useEffect, useRef } from 'react';
import { useTheme } from '../../lib/theme-context';

const CustomCursor = () => {
  const { theme } = useTheme();
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const trailsContainerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const cursorPosition = useRef({ x: 0, y: 0 });
  const trailPositions = useRef<Array<{ x: number; y: number }>>([]);
  const prevMousePosition = useRef({ x: 0, y: 0 });
  const isClicked = useRef(false);
  const isLinkHovered = useRef(false);
  const isHidden = useRef(false);
  const isMoving = useRef(false);
  const movementTimeout = useRef<number | null>(null);
  const lastMoveTime = useRef(0);
  const fadeOutTimeout = useRef<number | null>(null);
  const isActive = useRef(true);
  
  // Number of trail elements and settings
  const trailCount = 6; // Increased from 5 to 6 for a longer trail
  // Lower easing values make the trail converge more slowly (longer trail)
  const trailEasing = [0.15, 0.12, 0.09, 0.06, 0.04, 0.02]; 

  useEffect(() => {
    // Safety check for browser environment
    if (typeof window === 'undefined') return;
    
    // Create trail elements
    const createTrailElements = () => {
      if (!trailsContainerRef.current) return;
      
      // Clear existing trails
      trailsContainerRef.current.innerHTML = '';
      
      // Create new trail elements - with larger sizes and enhanced fading
      for (let i = 0; i < trailCount; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.zIndex = `${9998 - i}`;
        
        // Enhanced fading effect - much more pronounced opacity reduction
        const opacity = Math.max(0.05, 1 - (i * 0.2));
        trail.style.opacity = `${opacity}`;
        
        // Increased sizes for larger trail elements with more gradual reduction
        trail.style.width = `${46 - (i * 3)}px`;
        trail.style.height = `${46 - (i * 3)}px`;
        trail.style.borderWidth = `${2.5 - (i * 0.15)}px`;
        
        // Remove transition delay which can cause stickiness
        // Add transitions for opacity for fading effect
        trail.style.transition = 'opacity 0.4s ease, border-color 0.3s ease';
        
        if (theme === 'dark') {
          trail.classList.add('dark');
        }
        
        trailsContainerRef.current.appendChild(trail);
      }
    };
    
    createTrailElements();
    
    // Direct DOM manipulation approach for better performance
    const render = () => {
      if (!cursorRingRef.current || !trailsContainerRef.current) return;
      
      // Get current timestamp for fading calculations
      const now = performance.now();
      
      // Detect if mouse is moving
      const mouseDeltaX = mousePosition.current.x - prevMousePosition.current.x;
      const mouseDeltaY = mousePosition.current.y - prevMousePosition.current.y;
      const isCurrentlyMoving = Math.abs(mouseDeltaX) > 0.1 || Math.abs(mouseDeltaY) > 0.1;
      
      if (isCurrentlyMoving) {
        isMoving.current = true;
        lastMoveTime.current = now;
        isActive.current = true;
        
        // Clear any existing fade timeouts
        if (fadeOutTimeout.current) {
          window.clearTimeout(fadeOutTimeout.current);
          fadeOutTimeout.current = null;
        }
        
        // Clear previous movement timeout if exists
        if (movementTimeout.current) {
          window.clearTimeout(movementTimeout.current);
        }
        
        // Set timeout to detect when movement stops
        movementTimeout.current = window.setTimeout(() => {
          isMoving.current = false;
          
          // Start fade out effect after movement stops
          fadeOutTimeout.current = window.setTimeout(() => {
            isActive.current = false;
          }, 700); // Wait before starting fade
        }, 100);
      }
      
      // Calculate time since last movement (for fading effect)
      const timeSinceMove = now - lastMoveTime.current;
      
      // Store current position for next frame comparison
      prevMousePosition.current = { ...mousePosition.current };
      
      // Smooth cursor movement with easing
      const distX = mousePosition.current.x - cursorPosition.current.x;
      const distY = mousePosition.current.y - cursorPosition.current.y;
      
      cursorPosition.current.x += distX * 0.15;
      cursorPosition.current.y += distY * 0.15;
      
      // Always keep current position in trail history
      trailPositions.current[0] = { ...cursorPosition.current };
      
      // Update cursor ring position
      cursorRingRef.current.style.transform = `translate3d(${cursorPosition.current.x}px, ${cursorPosition.current.y}px, 0) translate(-50%, -50%)`;
      cursorRingRef.current.style.opacity = isHidden.current ? '0' : '1';
      
      // Update trail positions - using individual interpolation for each trail
      const trailElements = trailsContainerRef.current.children;
      for (let i = 0; i < trailElements.length; i++) {
        // Calculate position based on mouse position and easing
        const trail = trailElements[i] as HTMLElement;
        
        // For the first trail, use the main cursor position
        if (i === 0) {
          trail.style.transform = `translate3d(${cursorPosition.current.x}px, ${cursorPosition.current.y}px, 0) translate(-50%, -50%)`;
        } else {
          // For other trails, calculate their position with individual easing
          const easing = trailEasing[i] || 0.45; // Default easing if not defined
          
          // Get previous trail's position as target
          const prevTrail = trailPositions.current[i-1] || cursorPosition.current;
          
          // Get current trail's position or initialize it
          if (!trailPositions.current[i]) {
            trailPositions.current[i] = { ...cursorPosition.current };
          }
          
          // Apply easing to create smoother trail
          trailPositions.current[i].x += (prevTrail.x - trailPositions.current[i].x) * easing;
          trailPositions.current[i].y += (prevTrail.y - trailPositions.current[i].y) * easing;
          
          // Apply position
          trail.style.transform = `translate3d(${trailPositions.current[i].x}px, ${trailPositions.current[i].y}px, 0) translate(-50%, -50%)`;
        }
        
        // Calculate opacity with enhanced fading effect
        let baseOpacity = 1 - (i * 0.18); // Base opacity gradient
        
        // If not active (mouse hasn't moved recently), fade out more aggressively
        if (!isActive.current) {
          const fadeOutFactor = Math.min(1, (timeSinceMove - 700) / 800);
          baseOpacity *= Math.max(0, 1 - fadeOutFactor - (i * 0.15));
        }
        
        // Further reduce opacity for later trail elements
        baseOpacity = Math.max(0.05, baseOpacity);
        
        // Apply opacity
        trail.style.opacity = isHidden.current ? '0' : `${baseOpacity}`;
      }
      
      // Add or remove classes based on state
      if (isClicked.current) {
        cursorRingRef.current.classList.add('cursor-ring--clicked');
        trailsContainerRef.current.classList.add('trails-clicked');
      } else {
        cursorRingRef.current.classList.remove('cursor-ring--clicked');
        trailsContainerRef.current.classList.remove('trails-clicked');
      }
      
      if (isLinkHovered.current) {
        cursorRingRef.current.classList.add('cursor-ring--hover');
        trailsContainerRef.current.classList.add('trails-hover');
      } else {
        cursorRingRef.current.classList.remove('cursor-ring--hover');
        trailsContainerRef.current.classList.remove('trails-hover');
      }
      
      // Continue animation loop
      window.requestAnimationFrame(render);
    };
    
    // Initialize cursor position to current mouse position or center of screen
    const initialX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
    const initialY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;
    mousePosition.current = { x: initialX, y: initialY };
    prevMousePosition.current = { x: initialX, y: initialY };
    cursorPosition.current = { x: initialX, y: initialY };
    
    // Initialize trail positions
    for (let i = 0; i < trailCount; i++) {
      trailPositions.current[i] = { x: initialX, y: initialY };
    }
    
    // Set initial position of the cursor element
    if (cursorRingRef.current) {
      cursorRingRef.current.style.transform = `translate3d(${initialX}px, ${initialY}px, 0) translate(-50%, -50%)`;
      cursorRingRef.current.style.opacity = '1';
    }
    
    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
      isHidden.current = false;
    };
    
    const handleMouseDown = () => {
      isClicked.current = true;
    };
    
    const handleMouseUp = () => {
      isClicked.current = false;
    };
    
    const handleMouseLeave = () => {
      isHidden.current = true;
    };
    
    const handleMouseEnter = () => {
      isHidden.current = false;
    };
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    // Add hover listeners for interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    );
    
    const handleLinkEnter = () => {
      isLinkHovered.current = true;
    };
    
    const handleLinkLeave = () => {
      isLinkHovered.current = false;
    };
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleLinkEnter);
      el.addEventListener('mouseleave', handleLinkLeave);
    });
    
    // Start rendering
    const animationFrameId = window.requestAnimationFrame(render);
    
    // Cleanup
    return () => {
      if (movementTimeout.current) {
        window.clearTimeout(movementTimeout.current);
      }
      
      window.cancelAnimationFrame(animationFrameId);
      
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleLinkEnter);
        el.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, [theme, trailCount, trailEasing]);

  return (
    <>
      <div 
        ref={trailsContainerRef} 
        className="cursor-trails"
        style={{
          position: 'fixed',
          zIndex: 9998,
          pointerEvents: 'none',
          left: 0,
          top: 0,
        }}
      />
      <div 
        ref={cursorRingRef} 
        className="cursor-ring"
        data-theme={theme}
        style={{
          position: 'fixed',
          zIndex: 9999,
          pointerEvents: 'none',
          width: '46px',  /* Increased from 40px to 46px to match trail elements */
          height: '46px', /* Increased from 40px to 46px to match trail elements */
          borderRadius: '50%',
          border: `2.5px solid var(--primary)`, /* Slightly thicker border */
          backgroundColor: 'transparent',
          opacity: 1,
          willChange: 'transform',
        }}
      />
    </>
  );
};

export default CustomCursor;