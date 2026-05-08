import { useMode, type CatalogMode } from '../state/ModeContext';

const OPTIONS: { value: CatalogMode; label: string }[] = [
  { value: 'pokemon', label: 'Pokemon' },
  { value: 'jockey', label: 'Jockey' },
];

export function ModeToggle() {
  const { mode, setMode } = useMode();
  return (
    <div className="flex items-center gap-2 text-xs text-white/70">
      <span className="hidden sm:inline">View as</span>
      <div className="flex items-center gap-1.5">
        {OPTIONS.map((opt, i) => {
          const active = mode === opt.value;
          return (
            <span key={opt.value} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-white/30">·</span>}
              <button
                type="button"
                onClick={() => setMode(opt.value)}
                aria-pressed={active}
                className={`transition ${
                  active
                    ? 'text-white font-medium'
                    : 'text-white/60 hover:text-white/90'
                }`}
              >
                {opt.label}
              </button>
            </span>
          );
        })}
      </div>
    </div>
  );
}
