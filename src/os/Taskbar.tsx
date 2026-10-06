import { useEffect, useRef, useState } from 'react';
import { ALL_APP_IDS, APPS } from './appMeta';
import { useWM } from './wmContext';
import PixelIcon from './pixel';
import useViewport from './useViewport';
import { profile } from '../data/content';

export default function Taskbar({ onShutdown }: { onShutdown: () => void }) {
  const { wins, activeId, open, focus, minimize } = useWM();
  const { mobile } = useViewport();
  const [menu, setMenu] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!menu) return;
    const onDown = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenu(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [menu]);

  return (
    <div ref={menuRef} className="fixed inset-x-0 bottom-0 z-[9000]">
      {menu && (
        <nav
          aria-label="Start menu"
          className="menu-in absolute bottom-12 left-1 flex w-72 border-2 border-ink bg-cream text-ink shadow-[5px_5px_0_#121212]"
        >
          <div className="flex w-9 items-end justify-center bg-ink pb-3">
            <span className="rotate-180 font-pixel text-sm tracking-widest text-lime [writing-mode:vertical-rl]">
              abhishek<span className="text-pink">OS</span>
            </span>
          </div>
          <ul className="flex-1 py-1">
            {ALL_APP_IDS.map((id) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => {
                    open(id);
                    setMenu(false);
                  }}
                  className="flex w-full items-center gap-3 px-3 py-1.5 text-left text-sm hover:bg-ink hover:text-cream"
                >
                  <PixelIcon name={APPS[id].icon} size={22} />
                  {APPS[id].label}
                </button>
              </li>
            ))}
            <li className="my-1 border-t-2 border-dashed border-ink/30" />
            <li>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 px-3 py-1.5 text-sm hover:bg-ink hover:text-cream"
              >
                <PixelIcon name="document" size={22} />
                Résumé — AI / full-stack
              </a>
            </li>
            <li>
              <a
                href={profile.resumeSdeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 px-3 py-1.5 text-sm hover:bg-ink hover:text-cream"
              >
                <PixelIcon name="document" size={22} />
                Résumé — SDE / backend
              </a>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  setMenu(false);
                  onShutdown();
                }}
                className="flex w-full items-center gap-3 px-3 py-1.5 text-left text-sm hover:bg-ink hover:text-cream"
              >
                <span className="flex h-[22px] w-[22px] items-center justify-center font-pixel text-red">⏻</span>
                Restart…
              </button>
            </li>
          </ul>
        </nav>
      )}

      <div className="flex h-12 items-center gap-2 border-t-2 border-ink bg-cream px-1.5 text-ink">
        <button
          type="button"
          aria-expanded={menu}
          aria-label="Start menu"
          onClick={() => setMenu((m) => !m)}
          className={`flex h-9 items-center gap-2 border-2 border-ink px-3 font-pixel text-sm ${
            menu ? 'translate-x-[2px] translate-y-[2px] bg-ink text-lime' : 'bg-lime shadow-[2px_2px_0_#121212]'
          }`}
        >
          <span aria-hidden="true">▶</span> start
        </button>

        <ul className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto">
          {!mobile &&
            wins.map((w) => (
              <li key={w.id}>
                <button
                  type="button"
                  onClick={() => (activeId === w.id ? minimize(w.id) : focus(w.id))}
                  className={`flex h-9 max-w-44 items-center gap-2 border-2 border-ink px-2 text-xs ${
                    activeId === w.id ? 'bg-ink text-cream' : 'bg-cream'
                  }`}
                >
                  <PixelIcon name={APPS[w.id].icon} size={18} />
                  <span className="truncate">{APPS[w.id].title}</span>
                </button>
              </li>
            ))}
        </ul>

        <a
          href={profile.links.leetcode}
          target="_blank"
          rel="noreferrer"
          title="LeetCode Knight — peak rating 1854, top 5.8%"
          className="flex h-9 items-center gap-1.5 border-2 border-ink bg-yellow px-2 font-pixel text-xs hover:bg-ink hover:text-yellow"
        >
          <PixelIcon name="sword" size={18} />
          <span className="hidden sm:inline">LC</span> 1854
        </a>
        <time className="hidden h-9 items-center border-2 border-ink/40 px-2 font-pixel text-xs sm:flex" dateTime={now.toISOString()}>
          {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </time>
      </div>
    </div>
  );
}
