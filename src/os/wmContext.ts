import { createContext, useContext } from 'react';
import type { AppId } from './appMeta';

export interface WinState {
  id: AppId;
  x: number;
  y: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
}

export interface WM {
  wins: WinState[];
  opened: AppId[];
  activeId: AppId | null;
  open: (id: AppId) => void;
  close: (id: AppId) => void;
  focus: (id: AppId) => void;
  minimize: (id: AppId) => void;
  toggleMax: (id: AppId) => void;
  move: (id: AppId, x: number, y: number) => void;
}

export const WMContext = createContext<WM | null>(null);

export function useWM() {
  const ctx = useContext(WMContext);
  if (!ctx) throw new Error('useWM must be used inside <WindowManager>');
  return ctx;
}

export const TASKBAR_H = 48;
