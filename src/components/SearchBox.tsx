import { useState, useRef, useEffect } from 'react';
import type { SearchBox as HeadlessSearchBox } from '@coveo/headless';
import { useControllerState } from '../hooks/useController';

interface Props {
  controller: HeadlessSearchBox;
  placeholder?: string;
}

export function SearchBox({ controller, placeholder }: Props) {
  const state = useControllerState(controller);
  const [focused, setFocused] = useState(false);
  const blurTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (blurTimer.current) window.clearTimeout(blurTimer.current);
  }, []);

  const showSuggestions =
    focused && state.suggestions.length > 0 && state.value.length > 0;

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          controller.submit();
          (document.activeElement as HTMLElement | null)?.blur();
        }}
      >
        <div className="flex items-center bg-white rounded-full shadow-md border border-slate-200 focus-within:ring-2 focus-within:ring-pokemon-blue/40 focus-within:border-pokemon-blue transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-4 h-5 w-5 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.5 10.5a7.5 7.5 0 0013.15 6.15z"
            />
          </svg>
          <input
            type="search"
            value={state.value}
            onChange={(e) => controller.updateText(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              blurTimer.current = window.setTimeout(() => setFocused(false), 150);
            }}
            placeholder={placeholder ?? 'Search Pokemon by name, type, ability...'}
            className="flex-1 px-3 py-3 bg-transparent rounded-full focus:outline-none text-slate-900 placeholder:text-slate-400"
          />
          {state.value && (
            <button
              type="button"
              onClick={() => controller.clear()}
              className="text-slate-400 hover:text-slate-600 px-3"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </form>

      {showSuggestions && (
        <ul className="absolute z-10 left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
          {state.suggestions.map((s, i) => (
            <li key={`${s.rawValue}-${i}`}>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  controller.selectSuggestion(s.rawValue);
                }}
                className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700"
                dangerouslySetInnerHTML={{ __html: s.highlightedValue }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
