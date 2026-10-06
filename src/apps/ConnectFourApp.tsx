import { useEffect, useState } from 'react';
import { useEggs } from '../os/eggsContext';
import { PixelButton } from './ui';

const ROWS = 6;
const COLS = 7;
type Cell = 0 | 1 | 2; // 0 empty, 1 you, 2 bot
type Board = Cell[][];

const empty = (): Board => Array.from({ length: ROWS }, () => Array<Cell>(COLS).fill(0));

function dropRow(b: Board, c: number) {
  for (let r = ROWS - 1; r >= 0; r--) if (b[r][c] === 0) return r;
  return -1;
}

function place(b: Board, c: number, p: Cell): Board | null {
  const r = dropRow(b, c);
  if (r < 0) return null;
  const next = b.map((row) => [...row]);
  next[r][c] = p;
  return next;
}

function winner(b: Board): Cell {
  const dirs = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) {
      const p = b[r][c];
      if (!p) continue;
      for (const [dr, dc] of dirs) {
        let k = 1;
        while (k < 4 && b[r + dr * k]?.[c + dc * k] === p) k++;
        if (k === 4) return p;
      }
    }
  return 0;
}

// Same idea as the Go bot in my Connect Four project: win if possible, block if needed,
// avoid handing over a win, otherwise prefer the centre.
function botMove(b: Board): number {
  const valid = [3, 2, 4, 1, 5, 0, 6].filter((c) => dropRow(b, c) >= 0);
  for (const c of valid) if (winner(place(b, c, 2)!) === 2) return c;
  for (const c of valid) if (winner(place(b, c, 1)!) === 1) return c;
  const safe = valid.filter((c) => {
    const after = place(b, c, 2)!;
    return !valid.some((c2) => {
      const reply = place(after, c2, 1);
      return reply && winner(reply) === 1;
    });
  });
  const pool = safe.length ? safe : valid;
  return Math.random() < 0.25 ? pool[Math.floor(Math.random() * pool.length)] : pool[0];
}

export default function ConnectFourApp() {
  const { unlock } = useEggs();
  const [board, setBoard] = useState<Board>(empty);
  const [turn, setTurn] = useState<'you' | 'bot'>('you');
  const [score, setScore] = useState({ you: 0, bot: 0 });

  const win = winner(board);
  const full = board[0].every((c) => c !== 0);
  const over = win !== 0 || full;

  useEffect(() => {
    if (turn !== 'bot' || over) return;
    const t = setTimeout(() => {
      setBoard((b) => place(b, botMove(b), 2) ?? b);
      setTurn('you');
    }, 450);
    return () => clearTimeout(t);
  }, [turn, over]);

  useEffect(() => {
    if (win === 1) {
      unlock('connect4');
      setScore((s) => ({ ...s, you: s.you + 1 }));
    } else if (win === 2) setScore((s) => ({ ...s, bot: s.bot + 1 }));
  }, [win, unlock]);

  const play = (c: number) => {
    if (turn !== 'you' || over) return;
    const next = place(board, c, 1);
    if (!next) return;
    setBoard(next);
    setTurn('bot');
  };

  const reset = () => {
    setBoard(empty());
    setTurn('you');
  };

  const status = win === 1 ? 'You win! 🎉' : win === 2 ? 'Bot wins. Rematch?' : full ? 'Draw.' : turn === 'you' ? 'Your move (red)' : 'Bot is thinking…';

  return (
    <div className="flex flex-col items-center p-5">
      <div className="flex w-full max-w-sm items-center justify-between font-pixel text-sm">
        <span>
          You <span className="text-red">{score.you}</span>
        </span>
        <span aria-live="polite">{status}</span>
        <span>
          Bot <span className="text-[#c79a00]">{score.bot}</span>
        </span>
      </div>

      <div className="mt-4 grid w-full max-w-sm grid-cols-7 gap-1.5 border-2 border-ink bg-blue p-2 shadow-[4px_4px_0_#121212]">
        {Array.from({ length: COLS }, (_, c) => (
          <button
            key={c}
            type="button"
            aria-label={`Drop a disc in column ${c + 1}`}
            disabled={turn !== 'you' || over || dropRow(board, c) < 0}
            onClick={() => play(c)}
            className="group flex flex-col gap-1.5 disabled:cursor-not-allowed"
          >
            {board.map((row, r) => (
              <span
                key={r}
                className={`aspect-square w-full rounded-full border-2 border-ink transition-colors ${
                  row[c] === 1 ? 'bg-red' : row[c] === 2 ? 'bg-yellow' : 'bg-cream group-enabled:group-hover:bg-cream/70'
                }`}
              />
            ))}
          </button>
        ))}
      </div>

      <div className="mt-5 flex gap-3">
        <PixelButton tone={over ? 'lime' : 'cream'} onClick={reset}>
          {over ? 'Play again' : 'Restart'}
        </PixelButton>
      </div>
      <p className="mt-4 max-w-sm text-center text-xs text-ink/60">
        A tiny version of my real-time Go + WebSockets Connect Four. The full one has matchmaking and Kafka analytics.
      </p>
    </div>
  );
}
