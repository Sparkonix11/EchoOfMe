import { createContext, useContext } from 'react';

export const EGGS = [
  { id: 'terminal', title: "I'm in", desc: 'Opened the terminal.' },
  { id: 'sudo', title: 'Bold move', desc: 'Ran sudo hire-me.' },
  { id: 'connect4', title: 'Beat the bot', desc: 'Won a game of Connect Four.' },
  { id: 'bin', title: 'Digital archaeologist', desc: 'Dug through the recycle bin.' },
  { id: 'explorer', title: 'Completionist', desc: 'Opened every app on the desktop.' },
] as const;

export type EggId = (typeof EGGS)[number]['id'];

export interface Eggs {
  found: EggId[];
  unlock: (id: EggId) => void;
}

export const EggsContext = createContext<Eggs | null>(null);

export function useEggs() {
  const ctx = useContext(EggsContext);
  if (!ctx) throw new Error('useEggs must be used inside <EggsProvider>');
  return ctx;
}
