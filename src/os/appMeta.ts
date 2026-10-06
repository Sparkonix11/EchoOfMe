import type { IconName } from './pixel';

export type AppId =
  | 'welcome'
  | 'experience'
  | 'projects'
  | 'achievements'
  | 'skills'
  | 'terminal'
  | 'contact'
  | 'connect4'
  | 'bin';

export interface AppMeta {
  id: AppId;
  title: string; // window title bar
  label: string; // desktop icon label
  icon: IconName;
  bar: string; // title bar colour
  w: number;
  h: number;
}

export const APPS: Record<AppId, AppMeta> = {
  welcome: { id: 'welcome', title: 'welcome.txt', label: 'About me', icon: 'person', bar: '#b6f542', w: 620, h: 620 },
  experience: { id: 'experience', title: 'Experience.app', label: 'Experience', icon: 'briefcase', bar: '#ff9f1c', w: 720, h: 600 },
  projects: { id: 'projects', title: 'C:\\projects', label: 'Projects', icon: 'folder', bar: '#ffd23f', w: 760, h: 560 },
  achievements: { id: 'achievements', title: 'Achievements', label: 'Trophies', icon: 'trophy', bar: '#ff7ac6', w: 560, h: 560 },
  skills: { id: 'skills', title: 'Inventory', label: 'Inventory', icon: 'chest', bar: '#5ee7ff', w: 640, h: 560 },
  terminal: { id: 'terminal', title: 'terminal — zsh', label: 'Terminal', icon: 'terminal', bar: '#b8b8c8', w: 620, h: 420 },
  contact: { id: 'contact', title: 'New Message', label: 'Contact', icon: 'mail', bar: '#3a5bff', w: 520, h: 520 },
  connect4: { id: 'connect4', title: 'Connect4.exe', label: 'Connect 4', icon: 'connect4', bar: '#ff4d6d', w: 460, h: 480 },
  bin: { id: 'bin', title: 'Recycle Bin', label: 'Recycle Bin', icon: 'bin', bar: '#b8b8c8', w: 520, h: 440 },
};

// Desktop icon order; 'resume' is a shortcut that opens the PDF instead of a window.
export const DESKTOP_ORDER: (AppId | 'resume')[] = [
  'welcome',
  'experience',
  'projects',
  'skills',
  'achievements',
  'terminal',
  'connect4',
  'contact',
  'resume',
  'bin',
];

export const ALL_APP_IDS = Object.keys(APPS) as AppId[];
