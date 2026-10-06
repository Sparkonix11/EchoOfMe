import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { EGGS, EggsContext, type EggId } from './eggsContext';
import PixelIcon from './pixel';

const KEY = 'abhishek-os:eggs';

function load(): EggId[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as EggId[]) : [];
  } catch {
    return [];
  }
}

export default function EggsProvider({ children }: { children: ReactNode }) {
  const [found, setFound] = useState<EggId[]>(load);
  const [toast, setToast] = useState<EggId | null>(null);
  const foundRef = useRef(found);

  const unlock = useCallback((id: EggId) => {
    if (foundRef.current.includes(id)) return;
    const next = [...foundRef.current, id];
    foundRef.current = next;
    setFound(next);
    setToast(id);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      // Storage unavailable (private mode) — achievements just won't persist.
    }
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3800);
    return () => clearTimeout(t);
  }, [toast]);

  const egg = toast ? EGGS.find((e) => e.id === toast) : null;
  const value = useMemo(() => ({ found, unlock }), [found, unlock]);

  return (
    <EggsContext.Provider value={value}>
      {children}
      <div aria-live="polite" role="status" className="pointer-events-none fixed bottom-16 right-4 z-[9500]">
        {egg && (
          <div className="toast-in flex w-72 items-center gap-3 border-2 border-ink bg-ink p-3 text-cream shadow-[4px_4px_0_#ff7ac6]">
            <PixelIcon name="trophy" size={36} />
            <div>
              <p className="font-pixel text-[10px] text-lime">ACHIEVEMENT UNLOCKED</p>
              <p className="font-pixel text-sm">{egg.title}</p>
              <p className="text-xs text-cream/70">
                {egg.desc} ({found.length}/{EGGS.length})
              </p>
            </div>
          </div>
        )}
      </div>
    </EggsContext.Provider>
  );
}
