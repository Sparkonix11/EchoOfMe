import { useEffect, useState } from 'react';

// Tracks viewport size so windows stay inside the screen and mobile gets full-screen apps.
export default function useViewport() {
  const read = () => ({ w: window.innerWidth, h: window.innerHeight });
  const [vp, setVp] = useState(read);

  useEffect(() => {
    const onResize = () => setVp(read());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return { ...vp, mobile: vp.w < 768 };
}
