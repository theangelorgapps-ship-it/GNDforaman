import { useState } from "react";
import { Check, ChevronRight, Search } from "lucide-react";
import { Modal } from "./Modal";
import type { EditionLanguage } from "../collection-editions";
export function CollectionLanguageDialog({
  languages,
  selected,
  description,
  onSelect,
  onClose,
}: {
  languages: EditionLanguage[];
  selected: string;
  description: string;
  onSelect: (language: string) => void;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const options = languages.filter((l) =>
    l.name.toLowerCase().includes(query.trim().toLowerCase()),
  );
  return (
    <Modal
      title="Choose a language"
      onClose={onClose}
      className="collection-language-modal"
    >
      <p className="language-context">{description}</p>
      <label className="language-search">
        <Search size={18} />
        <span className="sr-only">Search languages</span>
        <input
          type="search"
          autoFocus
          placeholder="Search languages"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      <div
        className="language-options"
        role="group"
        aria-label="Edition languages"
      >
        {options.map((language) => (
          <button
            key={language.name}
            className={language.name === selected ? "selected" : ""}
            aria-pressed={language.name === selected}
            onClick={() => onSelect(language.name)}
          >
            <span>
              {language.name}
              <small>
                {language.url
                  ? "Full issue available"
                  : "No edition linked yet"}
              </small>
            </span>
            {language.name === selected ? (
              <Check size={18} />
            ) : (
              <ChevronRight size={17} />
            )}
          </button>
        ))}
      </div>
      {options.length === 0 && (
        <p className="language-empty" role="status">
          No language matches “{query}”.{" "}
          <button onClick={() => setQuery("")}>Clear search</button>
        </p>
      )}
    </Modal>
  );
}
