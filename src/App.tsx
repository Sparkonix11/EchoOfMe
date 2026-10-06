import { useCallback, useState } from 'react';
import Boot from './os/Boot';
import Desktop from './os/Desktop';
import EggsProvider from './os/EggsProvider';
import WindowManager from './os/WindowManager';

const BOOTED = 'abhishek-os:booted';

// Boot once per browser session, and never when the visitor prefers reduced motion.
function shouldBoot() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return sessionStorage.getItem(BOOTED) !== '1';
  } catch {
    return true;
  }
}

export default function App() {
  const [booting, setBooting] = useState(shouldBoot);
  const [session, setSession] = useState(0);

  const finishBoot = useCallback(() => {
    setBooting(false);
    try {
      sessionStorage.setItem(BOOTED, '1');
    } catch {
      // Storage unavailable — the boot screen will simply show again next visit.
    }
  }, []);

  const restart = useCallback(() => {
    setSession((s) => s + 1);
    setBooting(true);
  }, []);

  return (
    <EggsProvider>
      <WindowManager key={session} initial={['welcome']}>
        <Desktop onShutdown={restart} />
      </WindowManager>
      {booting && <Boot onDone={finishBoot} />}
    </EggsProvider>
  );
}
