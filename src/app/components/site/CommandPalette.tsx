"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";

export interface PaletteItem {
  label: string;
  hint: string;
  href: string;
  /** Extra words to match, such as a project's stack. */
  terms: string;
}

export const OPEN_PALETTE_EVENT = "open-command-palette";

const score = (item: PaletteItem, words: string[]) => {
  const label = item.label.toLowerCase();
  const all = `${label} ${item.hint.toLowerCase()} ${item.terms}`;
  if (!words.every((word) => all.includes(word))) return 0;
  return label.startsWith(words[0] ?? "") ? 2 : 1;
};

export default function CommandPalette({ items }: { items: PaletteItem[] }) {
  const router = useRouter();
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);

  const results = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    return items
      .map((item) => ({ item, rank: score(item, words) }))
      .filter((entry) => entry.rank > 0)
      .sort((a, b) => b.rank - a.rank)
      .map((entry) => entry.item);
  }, [items, query]);

  useEffect(() => {
    const open = () => {
      setQuery("");
      setIndex(0);
      if (!dialog.current?.open) dialog.current?.showModal();
      input.current?.focus();
    };
    const onKey = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (dialog.current?.open) dialog.current.close();
        else open();
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener(OPEN_PALETTE_EVENT, open);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener(OPEN_PALETTE_EVENT, open);
    };
  }, []);

  const go = (item?: PaletteItem) => {
    if (!item) return;
    dialog.current?.close();
    router.push(item.href);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const delta = event.key === "ArrowDown" ? 1 : -1;
      setIndex((current) =>
        results.length
          ? (current + delta + results.length) % results.length
          : 0,
      );
    }
    if (event.key === "Enter") {
      event.preventDefault();
      go(results[index]);
    }
  };

  useEffect(() => {
    document
      .getElementById(`palette-option-${index}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [index]);

  return (
    <dialog
      ref={dialog}
      className="palette"
      aria-label="Search projects, articles and pages"
      onClick={(event) => {
        if (event.target === dialog.current) dialog.current?.close();
      }}
    >
      <div className="palette-box">
        <div className="palette-input">
          <Search aria-hidden="true" />
          <input
            ref={input}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-autocomplete="list"
            aria-activedescendant={
              results.length ? `palette-option-${index}` : undefined
            }
            aria-label="Search projects, articles and pages"
            placeholder="Search projects, articles and pages"
            value={query}
            autoComplete="off"
            spellCheck={false}
            onChange={(event) => {
              setQuery(event.target.value);
              setIndex(0);
            }}
            onKeyDown={onKeyDown}
          />
        </div>
        <ul id="palette-list" role="listbox" aria-label="Results">
          {results.map((item, i) => (
            // Keyboard selection happens in the input, as combobox focus stays there.
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <li
              key={item.href}
              id={`palette-option-${i}`}
              role="option"
              aria-selected={i === index}
              onMouseEnter={() => setIndex(i)}
              onClick={() => go(item)}
            >
              <span>{item.label}</span>
              <small>{item.hint}</small>
            </li>
          ))}
        </ul>
        {results.length === 0 && (
          <p className="palette-empty">
            No match for "{query}". Try a technology, such as Python or React.
          </p>
        )}
      </div>
    </dialog>
  );
}
