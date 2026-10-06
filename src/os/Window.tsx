import { useEffect, useRef, type PointerEvent as RPointerEvent, type ReactNode } from 'react';
import { APPS } from './appMeta';
import { TASKBAR_H, useWM, type WinState } from './wmContext';
import PixelIcon from './pixel';
import useViewport from './useViewport';

export default function Window({ win, children }: { win: WinState; children: ReactNode }) {
  const meta = APPS[win.id];
  const { activeId, close, focus, minimize, toggleMax, move } = useWM();
  const { w: vw, h: vh, mobile } = useViewport();
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ dx: number; dy: number } | null>(null);
  const active = activeId === win.id;

  // Move keyboard focus into a window when it opens, for screen readers and keyboard users.
  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
  }, []);

  if (win.minimized) return null;

  const full = mobile || win.maximized;
  const width = Math.min(meta.w, vw - 24);
  const height = Math.min(meta.h, vh - TASKBAR_H - 24);
  const style = full
    ? { left: 0, top: 0, width: '100%', height: `calc(100dvh - ${TASKBAR_H}px)`, zIndex: win.z + 10 }
    : { left: win.x, top: win.y, width, height, zIndex: win.z + 10 };

  const onPointerDown = (e: RPointerEvent<HTMLDivElement>) => {
    if (full || (e.target as HTMLElement).closest('button')) return;
    focus(win.id);
    drag.current = { dx: e.clientX - win.x, dy: e.clientY - win.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: RPointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    const x = Math.min(Math.max(e.clientX - drag.current.dx, 80 - width), vw - 80);
    const y = Math.min(Math.max(e.clientY - drag.current.dy, 0), vh - TASKBAR_H - 40);
    move(win.id, x, y);
  };
  const endDrag = () => {
    drag.current = null;
  };

  return (
    <div
      ref={ref}
      role="dialog"
      aria-label={meta.title}
      tabIndex={-1}
      onPointerDownCapture={() => !active && focus(win.id)}
      onKeyDown={(e) => e.key === 'Escape' && close(win.id)}
      className={`window-in absolute flex flex-col overflow-hidden border-2 border-ink bg-cream text-ink outline-none ${
        full ? '' : active ? 'shadow-[6px_6px_0_#121212]' : 'shadow-[3px_3px_0_#121212]'
      }`}
      style={style}
    >
      <div
        className={`flex h-10 shrink-0 select-none items-center gap-2 border-b-2 border-ink px-2 ${full ? '' : 'cursor-grab active:cursor-grabbing'}`}
        style={{ background: active ? meta.bar : '#e6e1d4', touchAction: 'none' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={() => !mobile && toggleMax(win.id)}
      >
        <PixelIcon name={meta.icon} size={20} />
        <p className="flex-1 truncate font-pixel text-sm">{meta.title}</p>
        {!mobile && (
          <>
            <TitleButton label="Minimize" onClick={() => minimize(win.id)}>
              _
            </TitleButton>
            <TitleButton label={win.maximized ? 'Restore' : 'Maximize'} onClick={() => toggleMax(win.id)}>
              □
            </TitleButton>
          </>
        )}
        <TitleButton label="Close" onClick={() => close(win.id)}>
          ×
        </TitleButton>
      </div>
      <div className="min-h-0 flex-1 overflow-auto">{children}</div>
    </div>
  );
}

function TitleButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-7 w-7 items-center justify-center border-2 border-ink bg-cream font-pixel text-sm leading-none hover:bg-ink hover:text-cream"
    >
      {children}
    </button>
  );
}
