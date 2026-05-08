import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type CatalogMode = 'pokemon' | 'jockey';

const STORAGE_KEY = 'catalog-mode';

interface ModeContextValue {
  mode: CatalogMode;
  setMode: (mode: CatalogMode) => void;
}

const ModeContext = createContext<ModeContextValue | null>(null);

function readInitialMode(): CatalogMode {
  if (typeof window === 'undefined') return 'pokemon';
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === 'jockey' ? 'jockey' : 'pokemon';
}

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<CatalogMode>(readInitialMode);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const value = useMemo(() => ({ mode, setMode }), [mode]);
  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
}

export function useMode(): ModeContextValue {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error('useMode must be used within ModeProvider');
  return ctx;
}
