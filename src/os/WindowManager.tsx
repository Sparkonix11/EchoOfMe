import { useCallback, useMemo, useReducer, type ReactNode } from 'react';
import { APPS, type AppId } from './appMeta';
import { TASKBAR_H, WMContext, type WinState } from './wmContext';

interface State {
  wins: WinState[];
  top: number;
  opened: AppId[];
}

type Action =
  | { type: 'open'; id: AppId; x: number; y: number }
  | { type: 'close'; id: AppId }
  | { type: 'focus'; id: AppId }
  | { type: 'minimize'; id: AppId }
  | { type: 'toggleMax'; id: AppId }
  | { type: 'move'; id: AppId; x: number; y: number };

const patch = (wins: WinState[], id: AppId, p: Partial<WinState>) => wins.map((w) => (w.id === id ? { ...w, ...p } : w));

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case 'open': {
      const top = s.top + 1;
      const opened = s.opened.includes(a.id) ? s.opened : [...s.opened, a.id];
      if (s.wins.some((w) => w.id === a.id)) {
        return { ...s, top, opened, wins: patch(s.wins, a.id, { z: top, minimized: false }) };
      }
      const win: WinState = { id: a.id, x: a.x, y: a.y, z: top, minimized: false, maximized: false };
      return { ...s, top, opened, wins: [...s.wins, win] };
    }
    case 'close':
      return { ...s, wins: s.wins.filter((w) => w.id !== a.id) };
    case 'focus': {
      const top = s.top + 1;
      return { ...s, top, wins: patch(s.wins, a.id, { z: top, minimized: false }) };
    }
    case 'minimize':
      return { ...s, wins: patch(s.wins, a.id, { minimized: true }) };
    case 'toggleMax': {
      const w = s.wins.find((x) => x.id === a.id);
      return w ? { ...s, wins: patch(s.wins, a.id, { maximized: !w.maximized }) } : s;
    }
    case 'move':
      return { ...s, wins: patch(s.wins, a.id, { x: a.x, y: a.y }) };
  }
}

export default function WindowManager({ children, initial }: { children: ReactNode; initial: AppId[] }) {
  const [state, dispatch] = useReducer(reducer, undefined, () => {
    const wins = initial.map((id, i) => ({ ...placeFor(id, i), id, z: i + 1, minimized: false, maximized: false }));
    return { wins, top: initial.length, opened: [...initial] };
  });

  const open = useCallback(
    (id: AppId) => {
      const { x, y } = placeFor(id, state.wins.length);
      dispatch({ type: 'open', id, x, y });
    },
    [state.wins.length],
  );
  const close = useCallback((id: AppId) => dispatch({ type: 'close', id }), []);
  const focus = useCallback((id: AppId) => dispatch({ type: 'focus', id }), []);
  const minimize = useCallback((id: AppId) => dispatch({ type: 'minimize', id }), []);
  const toggleMax = useCallback((id: AppId) => dispatch({ type: 'toggleMax', id }), []);
  const move = useCallback((id: AppId, x: number, y: number) => dispatch({ type: 'move', id, x, y }), []);

  const activeId = useMemo(() => {
    const visible = state.wins.filter((w) => !w.minimized);
    return visible.length ? visible.reduce((a, b) => (b.z > a.z ? b : a)).id : null;
  }, [state.wins]);

  const value = useMemo(
    () => ({ wins: state.wins, opened: state.opened, activeId, open, close, focus, minimize, toggleMax, move }),
    [state.wins, state.opened, activeId, open, close, focus, minimize, toggleMax, move],
  );

  return <WMContext.Provider value={value}>{children}</WMContext.Provider>;
}

// Cascade new windows from the top-left, keeping them inside the viewport.
function placeFor(id: AppId, n: number) {
  const meta = APPS[id];
  const vw = typeof window === 'undefined' ? 1280 : window.innerWidth;
  const vh = typeof window === 'undefined' ? 800 : window.innerHeight - TASKBAR_H;
  const w = Math.min(meta.w, vw - 24);
  const h = Math.min(meta.h, vh - 24);
  const x = Math.max(12, Math.min(150 + (n % 6) * 36, vw - w - 12));
  const y = Math.max(12, Math.min(24 + (n % 6) * 30, vh - h - 12));
  return { x, y };
}
