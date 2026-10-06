// Hand-drawn 12x12 pixel-art icons, rendered as crisp SVG rects.
// Each map row is 12 characters; '.' is transparent, other letters index PALETTE.

const PALETTE: Record<string, string> = {
  k: '#121212', // outline
  w: '#ffffff',
  s: '#b8b8c8', // grey
  y: '#ffd23f', // yellow
  o: '#ff9f1c', // orange
  r: '#ff4d6d', // red
  u: '#3a5bff', // blue
  n: '#1b1f3b', // navy
  l: '#b6f542', // lime
  e: '#f2c49b', // skin
  p: '#ff7ac6', // pink
};

const ICONS = {
  person: [
    '....kkkk....',
    '...keeeek...',
    '...kekkek...',
    '...keeeek...',
    '....kkkk....',
    '...kllllk...',
    '..kllllllk..',
    '.klkllllklk.',
    '.klkllllklk.',
    '..kkllllkk..',
    '...kk..kk...',
    '...kk..kk...',
  ],
  briefcase: [
    '............',
    '....kkkk....',
    '...k....k...',
    'kkkkkkkkkkkk',
    'kooooooooook',
    'kooooooooook',
    'kkkkkyykkkkk',
    'kooooyyooook',
    'kooooooooook',
    'kooooooooook',
    'kkkkkkkkkkkk',
    '............',
  ],
  folder: [
    '............',
    '.kkkk.......',
    'kyyyyk......',
    'kyyyykkkkkk.',
    'kyyyyyyyyyyk',
    'kooooooooook',
    'kyyyyyyyyyyk',
    'kyyyyyyyyyyk',
    'kyyyyyyyyyyk',
    'kyyyyyyyyyyk',
    '.kkkkkkkkkk.',
    '............',
  ],
  trophy: [
    '..kkkkkkkk..',
    'kkkyyyyyykkk',
    'k.kyyyyyyk.k',
    'k.kyyyyyyk.k',
    '.kkyyyyyykk.',
    '...kyyyyk...',
    '....kyyk....',
    '.....kk.....',
    '....kyyk....',
    '...kkkkkk...',
    '...kyyyyk...',
    '...kkkkkk...',
  ],
  chest: [
    '............',
    '.kkkkkkkkkk.',
    'kooooooooook',
    'kooooooooook',
    'kkkkkkkkkkkk',
    'kooooyyooook',
    'kooookkooook',
    'kooooooooook',
    'kooooooooook',
    'kkkkkkkkkkkk',
    '............',
    '............',
  ],
  terminal: [
    'kkkkkkkkkkkk',
    'kssssssssssk',
    'kkkkkkkkkkkk',
    'knnnnnnnnnnk',
    'knlnnnnnnnnk',
    'knnlnnnnnnnk',
    'knlnnnnnnnnk',
    'knnnnllllnnk',
    'knnnnnnnnnnk',
    'knnnnnnnnnnk',
    'kkkkkkkkkkkk',
    '............',
  ],
  mail: [
    '............',
    '............',
    'kkkkkkkkkkkk',
    'kkwwwwwwwwkk',
    'kwkwwwwwwkwk',
    'kwwkwwwwkwwk',
    'kwwwkwwkwwwk',
    'kwwwwkkwwwwk',
    'kwwwwwwwwwwk',
    'kkkkkkkkkkkk',
    '............',
    '............',
  ],
  document: [
    '..kkkkkkk...',
    '..kwwwwwkk..',
    '..kwwwwwkwk.',
    '..kwwwwwkkkk',
    '..kwwwwwwwwk',
    '..kwsssssswk',
    '..kwwwwwwwwk',
    '..kwsssssswk',
    '..kwwwwwwwwk',
    '..kwssssswwk',
    '..kwwwwwwwwk',
    '..kkkkkkkkkk',
  ],
  connect4: [
    'kkkkkkkkkkkk',
    'kuuuuuuuuuuk',
    'kuwwuwwuwwuk',
    'kuwwuwwuwwuk',
    'kuuuuuuuuuuk',
    'kuwwurruwwuk',
    'kuwwurruwwuk',
    'kuuuuuuuuuuk',
    'kuyyurruyyuk',
    'kuyyurruyyuk',
    'kuuuuuuuuuuk',
    'kkkkkkkkkkkk',
  ],
  bin: [
    '....kkkk....',
    'kkkkkkkkkkkk',
    'kssssssssssk',
    'kkkkkkkkkkkk',
    '.kssksskssk.',
    '.kssksskssk.',
    '.kssksskssk.',
    '.kssksskssk.',
    '.kssksskssk.',
    '.kssksskssk.',
    '.kkkkkkkkkk.',
    '............',
  ],
  sword: [
    '..........kk',
    '.........kwk',
    '........kwk.',
    '.......kwk..',
    '......kwk...',
    '.....kwk....',
    '.kk.kwk.....',
    '.kykwk......',
    '..kyk.......',
    '.kykyk......',
    'kyk.kk......',
    'kk..........',
  ],
} as const;

export type IconName = keyof typeof ICONS;

export default function PixelIcon({ name, size = 40, className }: { name: IconName; size?: number; className?: string }) {
  const rows = ICONS[name];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      shapeRendering="crispEdges"
      className={className}
      aria-hidden="true"
    >
      {rows.flatMap((row, y) =>
        [...row].map((ch, x) => (ch === '.' ? null : <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={PALETTE[ch]} />)),
      )}
    </svg>
  );
}
