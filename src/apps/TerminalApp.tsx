import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { ALL_APP_IDS, type AppId } from '../os/appMeta';
import { useWM } from '../os/wmContext';
import { useEggs } from '../os/eggsContext';
import { profile } from '../data/content';

type Line = { kind: 'in' | 'out' | 'err' | 'ok'; text: ReactNode };

const HELP = [
  'whoami        who is this guy',
  'neofetch      system info, but it is me',
  'ls            list desktop apps',
  'open <app>    open an app, e.g. open projects',
  'git log       recent commits (real numbers)',
  'leetcode      competitive programming stats',
  'resume        open résumé.pdf',
  'play          challenge the Connect Four bot',
  'sudo hire-me  you know you want to',
  'clear         clear the screen',
];

// Art and info render as separate columns: block glyphs are narrower than text in most fonts.
const NEOFETCH_ART = ` ▄▄▄▄▄▄▄
█ ▄▄▄▄▄ █
█ █▀▀▀█ █
█ █▄▄▄█ █
█▄▄▄▄▄▄▄█
 ▀▀█ █▀▀
  ▄█▄█▄`;

const NEOFETCH_INFO: [string, string][] = [
  ['OS', 'abhishek-OS 26.10'],
  ['Role', 'Full-stack + AI Engineer'],
  ['Uptime', '4 years of shipping'],
  ['Users', '4,100+ on SignSetu Connect'],
  ['Data', '42K judgments · 1.4M chunks'],
  ['Shell', 'LeetCode 1854 (Knight)'],
  ['Stack', 'Next.js · Expo · LangGraph · pgvector'],
];

function Neofetch() {
  return (
    <div className="my-1 flex gap-5">
      <pre className="hidden leading-snug text-lime sm:block">{NEOFETCH_ART}</pre>
      <div className="min-w-0">
        <p className="text-pink">abhishek@abhishek-os</p>
        <p className="text-cream/40">--------------------</p>
        {NEOFETCH_INFO.map(([k, v]) => (
          <p key={k}>
            <span className="inline-block w-16 text-yellow">{k}</span>
            {v}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function TerminalApp() {
  const { open, close } = useWM();
  const { unlock } = useEggs();
  const [lines, setLines] = useState<Line[]>([
    { kind: 'ok', text: 'abhishek-OS terminal. Type `help` to see what I can do.' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    unlock('terminal');
    inputRef.current?.focus();
  }, [unlock]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [lines]);

  const print = (...out: Line[]) => setLines((l) => [...l, ...out]);
  const out = (text: ReactNode): Line => ({ kind: 'out', text });

  const run = (raw: string) => {
    const cmd = raw.trim();
    print({ kind: 'in', text: cmd });
    if (!cmd) return;
    setHistory((h) => [cmd, ...h]);
    const [name, ...args] = cmd.split(/\s+/);
    const arg = args.join(' ').toLowerCase();

    switch (name.toLowerCase()) {
      case 'help':
        return print(...HELP.map(out));
      case 'whoami':
        return print(out(`${profile.name} — ${profile.role}. Currently shipping at SignSetu. Open to SDE & AI roles.`));
      case 'neofetch':
        return print(out(<Neofetch />));
      case 'ls':
        return print(out([...ALL_APP_IDS, 'resume.pdf'].join('   ')));
      case 'open': {
        if (ALL_APP_IDS.includes(arg as AppId)) {
          open(arg as AppId);
          return print({ kind: 'ok', text: `opening ${arg}…` });
        }
        if (arg === 'resume' || arg === 'resume.pdf') return openResume();
        return print({ kind: 'err', text: `open: no such app '${arg}'. Try \`ls\`.` });
      }
      case 'cat':
        if (arg.startsWith('resume')) return openResume();
        return print({ kind: 'err', text: `cat: ${arg || 'nothing'}: try \`open ${arg || 'projects'}\` instead` });
      case 'resume':
        return openResume();
      case 'git':
        if (arg === 'log')
          return print(
            out('2,153 commits  SignSetu — web, API, payments & Expo monorepo'),
            out('  668 commits  GyanAlign — legal RAG + LangGraph agent'),
            out('   98 commits  Research Assistant Agent — GraphRAG, MCP, Yjs'),
            out('   59 commits  Amorcer — clinic site generator (acquired)'),
          );
        return print({ kind: 'err', text: 'git: only `git log` is installed here' });
      case 'leetcode':
        return print(
          out('Rating 1854 · Knight · top 5.8% globally'),
          out(
            <a href={profile.links.leetcode} target="_blank" rel="noreferrer" className="underline">
              {profile.links.leetcode}
            </a>,
          ),
        );
      case 'play':
      case 'connect4':
        open('connect4');
        return print({ kind: 'ok', text: 'launching Connect4.exe… good luck, the bot blocks.' });
      case 'sudo':
        if (arg === 'hire-me' || arg === 'hire me') {
          unlock('sudo');
          setTimeout(() => open('contact'), 700);
          return print(out('[sudo] password for recruiter: ********'), { kind: 'ok', text: 'Access granted. Opening a new message…' });
        }
        return print({ kind: 'err', text: 'Nice try. This incident will be reported to /dev/null.' });
      case 'rm':
        return print({ kind: 'err', text: 'Permission denied: this portfolio is load-bearing.' });
      case 'coffee':
        return print(out('☕ brewing… deploying on a Friday? bold.'));
      case 'date':
        return print(out(new Date().toString()));
      case 'echo':
        return print(out(args.join(' ')));
      case 'clear':
        return setLines([]);
      case 'exit':
        return close('terminal');
      default:
        return print({ kind: 'err', text: `command not found: ${name}. Try \`help\`.` });
    }
  };

  const openResume = () => {
    window.open(profile.resumeUrl, '_blank', 'noopener');
    print({ kind: 'ok', text: 'opening resume.pdf in a new tab…' });
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      run(input);
      setInput('');
      setHIdx(-1);
    } else if (e.key === 'ArrowUp' && history.length) {
      e.preventDefault();
      const i = Math.min(hIdx + 1, history.length - 1);
      setHIdx(i);
      setInput(history[i]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const i = hIdx - 1;
      setHIdx(i);
      setInput(i >= 0 ? history[i] : '');
    }
  };

  const color = { in: 'text-cream', out: 'text-cream/85', err: 'text-red', ok: 'text-lime' };

  return (
    <div
      className="min-h-full bg-[#101218] p-4 font-mono text-sm text-cream"
      onClick={() => inputRef.current?.focus()}
      role="presentation"
    >
      {lines.map((l, i) => (
        <div key={i} className={`whitespace-pre-wrap break-words ${color[l.kind]}`}>
          {l.kind === 'in' ? (
            <>
              <span className="text-pink">abhishek@os</span>
              <span className="text-cream/50">:~$ </span>
              {l.text}
            </>
          ) : (
            l.text
          )}
        </div>
      ))}
      <div className="flex items-center" ref={endRef}>
        <label htmlFor="term-input" className="shrink-0">
          <span className="text-pink">abhishek@os</span>
          <span className="text-cream/50">:~$&nbsp;</span>
        </label>
        <input
          id="term-input"
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          className="min-w-0 flex-1 bg-transparent text-cream caret-lime outline-none focus-visible:outline-none"
          aria-label="Terminal command"
        />
      </div>
    </div>
  );
}
