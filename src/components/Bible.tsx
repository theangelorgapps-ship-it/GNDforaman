import { useEffect, useRef, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Copy,
  Highlighter,
  LoaderCircle,
  MoreHorizontal,
  Pause,
  Play,
  Search,
  Trash2,
  Volume2,
  X,
} from "lucide-react";
import {
  BIBLE_BOOKS,
  BIBLE_VERSIONS,
  OFFLINE_CHAPTERS,
  parseBibleReference,
  restoreBibleHighlights,
} from "../bible-data";
import type {
  BibleHighlight,
  BibleReference,
  BibleVerse,
  BibleVersion,
  HighlightColor,
} from "../bible-data";
import { Modal } from "./Modal";
import "./bible.css";

type HighlightMap = Record<string, BibleHighlight>;
const STORAGE_KEY = "gnd-local-bible-highlights";
const DEFAULT_REFERENCE: BibleReference = { book: "John", chapter: 3 };
const highlightKey = (
  version: BibleVersion,
  book: string,
  chapter: number,
  verse: number,
) => `${version}:${book}:${chapter}:${verse}`;
function readHighlights(): HighlightMap {
  try {
    const value: unknown = JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? "{}",
    );
    return restoreBibleHighlights(value);
  } catch {
    return {};
  }
}
function cachedChapter(key: string): BibleVerse[] | null {
  if (OFFLINE_CHAPTERS[key]) return OFFLINE_CHAPTERS[key];
  try {
    const data: unknown = JSON.parse(
      localStorage.getItem(`gnd-local-bible-chapter:${key}`) ?? "null",
    );
    if (
      Array.isArray(data) &&
      data.length &&
      data.every((v) => Number.isInteger(v.verse) && typeof v.text === "string")
    )
      return data;
  } catch {
    /* Cached data is optional. */
  }
  return null;
}

export function Bible({ initialReference }: { initialReference?: string }) {
  const [reference, setReference] = useState<BibleReference>(
    () => parseBibleReference(initialReference ?? "") ?? DEFAULT_REFERENCE,
  );
  const [version, setVersion] = useState<BibleVersion>("asv");
  const chapterKey = `${version}:${reference.book}:${reference.chapter}`;
  const [verses, setVerses] = useState<BibleVerse[]>(
    () => cachedChapter(`asv:${reference.book}:${reference.chapter}`) ?? [],
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);
  const [panel, setPanel] = useState<
    "books" | "version" | "search" | "options" | "highlights" | null
  >(null);
  const [pickerBook, setPickerBook] = useState(reference.book);
  const [bookQuery, setBookQuery] = useState("");
  const [search, setSearch] = useState("");
  const [searchError, setSearchError] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const [highlights, setHighlights] = useState<HighlightMap>(readHighlights);
  const [trayOpen, setTrayOpen] = useState(true);
  const [fontSize, setFontSize] = useState(() => {
    try {
      const n = Number(localStorage.getItem("gnd-local-bible-font"));
      return n >= 14 && n <= 22 ? n : 14;
    } catch {
      return 14;
    }
  });
  const [notice, setNotice] = useState("");
  const [speechState, setSpeechState] = useState<"idle" | "playing" | "paused">(
    "idle",
  );
  const [spokenVerse, setSpokenVerse] = useState<number | null>(null);
  const speechRun = useRef(0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const speechAvailable =
    typeof window !== "undefined" && "speechSynthesis" in window;
  const bookIndex = BIBLE_BOOKS.findIndex(
    (book) => book.name === reference.book,
  );
  const currentBook = BIBLE_BOOKS[bookIndex];
  const chapterTitle = `${reference.book} ${reference.chapter}`;
  const versionTitle = BIBLE_VERSIONS.find((item) => item.id === version)!;
  const sourceReference = parseBibleReference(initialReference ?? "");
  const citedVersion = initialReference?.match(/\(([a-z][a-z0-9]{1,9})\)\s*$/i)?.[1];
  const showTranslationNotice =
    citedVersion &&
    citedVersion.toLowerCase() !== version &&
    sourceReference?.book === reference.book &&
    sourceReference?.chapter === reference.chapter;
  const referenceResult = parseBibleReference(search);
  const textMatches =
    search.trim().length > 1 && !referenceResult
      ? verses.filter((verse) =>
          verse.text.toLowerCase().includes(search.trim().toLowerCase()),
        )
      : [];

  function stopSpeech() {
    speechRun.current += 1;
    if (speechAvailable) window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setSpeechState("idle");
    setSpokenVerse(null);
  }
  function startSpeech(reading = verses) {
    if (!speechAvailable) {
      setNotice("Your browser does not support spoken reading.");
      return;
    }
    stopSpeech();
    if (!reading.length) return;
    window.speechSynthesis.resume();
    const run = speechRun.current;
    setSpeechState("playing");
    function readVerse(index: number) {
      if (speechRun.current !== run) return;
      if (index >= reading.length) {
        setSpeechState("idle");
        setSpokenVerse(null);
        return;
      }
      const item = reading[index];
      setSpokenVerse(item.verse);
      const utterance = new SpeechSynthesisUtterance(item.text);
      utterance.lang = "en-GB";
      utterance.rate = 0.9;
      utterance.onend = () => readVerse(index + 1);
      utterance.onerror = (event) => {
        if (
          speechRun.current !== run ||
          event.error === "canceled" ||
          event.error === "interrupted"
        )
          return;
        setSpeechState("idle");
        setSpokenVerse(null);
        setNotice(
          "Spoken reading is unavailable. Try your browser’s installed English voice.",
        );
      };
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
    readVerse(0);
  }
  function toggleSpeech() {
    if (!speechAvailable) {
      setNotice("Your browser does not support spoken reading.");
      return;
    }
    if (speechState === "playing") {
      window.speechSynthesis.pause();
      setSpeechState("paused");
    } else if (speechState === "paused") {
      window.speechSynthesis.resume();
      setSpeechState("playing");
    } else startSpeech();
  }
  function navigate(next: BibleReference) {
    stopSpeech();
    setReference(next);
    setSelected([]);
    setPanel(null);
    setSearchError("");
    if (!next.verse) window.scrollTo({ top: 0, behavior: "instant" });
  }
  function moveChapter(direction: -1 | 1) {
    const chapter = reference.chapter + direction;
    if (chapter >= 1 && chapter <= currentBook.chapters)
      navigate({ book: reference.book, chapter });
    else {
      const nextBook = BIBLE_BOOKS[bookIndex + direction];
      if (nextBook)
        navigate({
          book: nextBook.name,
          chapter: direction === 1 ? 1 : nextBook.chapters,
        });
    }
  }
  function openBooks() {
    setPickerBook(reference.book);
    setBookQuery("");
    setPanel("books");
  }
  function saveHighlights(next: HighlightMap) {
    setHighlights(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      setNotice(
        "Your highlights are available for this visit, but browser storage is full or unavailable.",
      );
    }
  }
  function highlightSelection(color: HighlightColor | null) {
    const next = { ...highlights };
    for (const number of selected) {
      const key = highlightKey(
        version,
        reference.book,
        reference.chapter,
        number,
      );
      const verse = verses.find((item) => item.verse === number);
      if (color && verse)
        next[key] = {
          book: reference.book,
          chapter: reference.chapter,
          verse: number,
          version,
          text: verse.text,
          color,
        };
      else delete next[key];
    }
    saveHighlights(next);
    setSelected([]);
  }
  async function copySelection() {
    const text = `${chapterTitle}:${selected.join(", ")} (${version.toUpperCase()})\n${verses
      .filter((verse) => selected.includes(verse.verse))
      .map((verse) => `${verse.verse} ${verse.text}`)
      .join("\n")}`;
    try {
      await navigator.clipboard.writeText(text);
      setNotice("Selected verses copied.");
    } catch {
      setNotice(
        "Copy is unavailable in this browser. You can select the verse text to copy it.",
      );
    }
  }
  function searchPassage(event: FormEvent) {
    event.preventDefault();
    if (referenceResult) {
      navigate(referenceResult);
      setSearch("");
    } else if (!textMatches.length)
      setSearchError(
        "Enter a reference such as Proverbs 24:33–34, or words from this chapter.",
      );
  }

  useEffect(() => {
    setReference(
      parseBibleReference(initialReference ?? "") ?? DEFAULT_REFERENCE,
    );
  }, [initialReference]);
  useEffect(() => {
    speechRun.current += 1;
    if (speechAvailable) window.speechSynthesis.cancel();
    setSpeechState("idle");
    setSpokenVerse(null);
    setError("");
    setSelected([]);
    const cached = cachedChapter(chapterKey);
    if (cached) {
      setVerses(cached);
      setLoading(false);
      return;
    }
    setVerses([]);
    setLoading(true);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort("timeout"), 15000);
    let active = true;
    fetch(
      `https://bible-api.com/${encodeURIComponent(chapterTitle)}?translation=${version}&single_chapter_book_matching=indifferent`,
      { signal: controller.signal },
    )
      .then(async (response) => {
        if (!response.ok)
          throw new Error(
            response.status === 429
              ? "The Bible source is busy. Please wait a moment and retry."
              : "This chapter could not be loaded. Check your connection and retry.",
          );
        const data = await response.json();
        if (
          !Array.isArray(data.verses) ||
          !data.verses.length ||
          !data.verses.every(
            (item: BibleVerse) =>
              typeof item.text === "string" && Number.isInteger(item.verse),
          )
        )
          throw new Error(
            "The Bible source did not return a complete chapter. Please retry.",
          );
        const chapter: BibleVerse[] = data.verses.map((item: BibleVerse) => ({
          verse: item.verse,
          text: item.text.trim(),
        }));
        if (!active) return;
        setVerses(chapter);
        try {
          localStorage.setItem(
            `gnd-local-bible-chapter:${chapterKey}`,
            JSON.stringify(chapter),
          );
        } catch {
          /* Text remains readable if the cache is full. */
        }
      })
      .catch((reason) => {
        if (active)
          setError(
            controller.signal.aborted
              ? "The chapter took too long to load. Check your connection and retry."
              : reason instanceof Error
                ? reason.message
                : "This chapter is unavailable. Please retry.",
          );
      })
      .finally(() => {
        if (active) setLoading(false);
        window.clearTimeout(timeout);
      });
    return () => {
      active = false;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [chapterKey, reload]);
  useEffect(() => {
    if (!verses.length || loading || error || !reference.verse) return;
    if (
      !verses.some((verse) => verse.verse === reference.verse) ||
      (reference.endVerse &&
        !verses.some((verse) => verse.verse === reference.endVerse))
    ) {
      setNotice(
        `That verse range is not available in ${chapterTitle}. The full chapter is shown.`,
      );
      return;
    }
    const range = verses
      .filter(
        (verse) =>
          verse.verse >= reference.verse! &&
          verse.verse <= (reference.endVerse ?? reference.verse!),
      )
      .map((verse) => verse.verse);
    setSelected(range);
    const frame = requestAnimationFrame(() =>
      document
        .getElementById(`bible-verse-${reference.verse}`)
        ?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth",
          block: "center",
        }),
    );
    return () => cancelAnimationFrame(frame);
  }, [verses, loading, error, reference]);
  useEffect(
    () => () => {
      speechRun.current += 1;
      if (speechAvailable) window.speechSynthesis.cancel();
    },
    [],
  );
  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(""), 6000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  return (
    <section className="bible-screen" aria-label="Bible reader">
      <header className="bible-header">
        <div className="bible-heading-controls">
          <button
            className="bible-reference-button"
            onClick={openBooks}
            aria-label={`Choose book and chapter. Currently ${chapterTitle}`}
          >
            {chapterTitle}
            <ChevronDown size={16} />
          </button>
          <button
            className="bible-version-button"
            onClick={() => setPanel("version")}
            aria-label={`Change Bible version. Currently ${versionTitle.abbreviation}`}
          >
            {versionTitle.abbreviation}
          </button>
        </div>
        <div className="bible-header-actions">
          <button
            className={`icon-button ${speechState !== "idle" ? "bible-audio-active" : ""}`}
            onClick={toggleSpeech}
            disabled={!verses.length || loading}
            aria-label={
              speechState === "playing"
                ? "Pause reading"
                : speechState === "paused"
                  ? "Resume reading"
                  : "Listen to chapter"
            }
          >
            {speechState === "playing" ? (
              <Pause size={20} />
            ) : (
              <Volume2 size={20} />
            )}
          </button>
          <button
            className="icon-button"
            onClick={() => {
              setSearchError("");
              setPanel("search");
            }}
            aria-label="Search Bible"
          >
            <Search size={20} />
          </button>
          <button
            className="icon-button"
            onClick={() => setPanel("options")}
            aria-label="Bible reading options"
          >
            <MoreHorizontal size={23} />
          </button>
        </div>
      </header>
      {showTranslationNotice && (
        <p className="bible-translation-notice">
          This passage is shown in {versionTitle.abbreviation}. The devotional
          quotes {citedVersion.toUpperCase()}.
        </p>
      )}
      <div
        className="bible-passage"
        style={{ "--bible-font-size": `${fontSize}px` } as CSSProperties}
        aria-busy={loading}
      >
        {loading && (
          <div className="bible-status" role="status">
            <LoaderCircle className="bible-spinner" size={22} />
            <p>Loading {chapterTitle}…</p>
          </div>
        )}
        {error && (
          <div className="bible-status" role="alert">
            <p>{error}</p>
            <button
              className="primary-button"
              onClick={() => setReload((value) => value + 1)}
            >
              Try again
            </button>
            <button
              className="glass-button"
              onClick={() => navigate(DEFAULT_REFERENCE)}
            >
              Read John 3 offline
            </button>
          </div>
        )}
        {!loading &&
          !error &&
          verses.map((verse) => {
            const saved =
              highlights[
                highlightKey(
                  version,
                  reference.book,
                  reference.chapter,
                  verse.verse,
                )
              ];
            const isSelected = selected.includes(verse.verse);
            return (
              <p
                key={`${chapterKey}:${verse.verse}`}
                id={`bible-verse-${verse.verse}`}
                className={`bible-verse${saved ? ` bible-highlight-${saved.color}` : ""}${isSelected ? " bible-verse-selected" : ""}${spokenVerse === verse.verse ? " bible-verse-speaking" : ""}`}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                aria-label={`${chapterTitle} verse ${verse.verse}${saved ? ", highlighted" : ""}. ${verse.text}`}
                onClick={() =>
                  setSelected((previous) =>
                    previous.includes(verse.verse)
                      ? previous.filter((number) => number !== verse.verse)
                      : [...previous, verse.verse].sort((a, b) => a - b),
                  )
                }
                onKeyDown={(event) => {
                  if (event.key === " " || event.key === "Enter") {
                    event.preventDefault();
                    event.currentTarget.click();
                  }
                }}
              >
                <span className="bible-verse-number">{verse.verse}</span>
                {verse.text}
              </p>
            );
          })}
        {!loading && !error && (
          <footer className="bible-passage-footer">
            <p>{versionTitle.name} · Public domain</p>
            <a href="https://bible-api.com/" target="_blank" rel="noreferrer">
              Scripture source: Bible API
            </a>
          </footer>
        )}
      </div>
      {selected.length > 0 && (
        <div
          className={`bible-selection-bar${trayOpen ? "" : " bible-selection-low"}`}
          role="toolbar"
          aria-label="Selected verse actions"
        >
          <span>{selected.length} selected</span>
          {(["yellow", "blue", "pink"] as HighlightColor[]).map((color) => (
            <button
              key={color}
              className={`bible-color bible-color-${color}`}
              aria-label={`Highlight selected verses ${color}`}
              onClick={() => highlightSelection(color)}
            >
              <Highlighter size={15} />
            </button>
          ))}
          <button
            className="icon-button"
            onClick={() => highlightSelection(null)}
            aria-label="Remove selected verse highlights"
          >
            <Trash2 size={17} />
          </button>
          <button
            className="icon-button"
            onClick={copySelection}
            aria-label="Copy selected verses"
          >
            <Copy size={17} />
          </button>
          <button
            className="icon-button"
            onClick={() => setSelected([])}
            aria-label="Clear verse selection"
          >
            <X size={17} />
          </button>
        </div>
      )}
      <div
        className={`bible-chapter-tray${trayOpen ? "" : " bible-tray-collapsed"}`}
      >
        <div className="bible-tray-heading">
          <span className="bible-tray-label">Bible</span>
          <button
            className="bible-tray-toggle"
            onClick={() => setTrayOpen(!trayOpen)}
            aria-label={
              trayOpen ? "Collapse chapter controls" : "Expand chapter controls"
            }
            aria-expanded={trayOpen}
          >
            {trayOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
        </div>
        {trayOpen && (
          <div className="bible-tray-content">
            <button className="bible-tray-reference" onClick={openBooks}>
              <img src="/assets/object-bible-brown.png" alt="" />
              <span>
                {chapterTitle} · {versionTitle.abbreviation}
              </span>
              <ChevronDown size={14} />
            </button>
            <div className="bible-tray-playback">
              <button
                aria-label="Previous chapter"
                disabled={bookIndex === 0 && reference.chapter === 1}
                onClick={() => moveChapter(-1)}
              >
                <ChevronLeft size={20} strokeWidth={1.7} />
              </button>
              <button
                aria-label={
                  speechState === "playing"
                    ? "Pause chapter audio"
                    : speechState === "paused"
                      ? "Resume chapter audio"
                      : "Play chapter audio"
                }
                disabled={loading || !verses.length}
                onClick={toggleSpeech}
              >
                {speechState === "playing" ? (
                  <Pause size={20} strokeWidth={1.7} />
                ) : (
                  <Play size={20} strokeWidth={1.7} />
                )}
              </button>
              <button
                aria-label="Next chapter"
                disabled={
                  bookIndex === BIBLE_BOOKS.length - 1 &&
                  reference.chapter === currentBook.chapters
                }
                onClick={() => moveChapter(1)}
              >
                <ChevronRight size={20} strokeWidth={1.7} />
              </button>
            </div>
          </div>
        )}
      </div>
      {notice && (
        <div className="bible-toast" role="status">
          {notice}
        </div>
      )}

      {panel === "books" && (
        <Modal
          title="Books & chapters"
          onClose={() => setPanel(null)}
          className="bible-dialog"
        >
          <label className="bible-field-label" htmlFor="bible-book-search">
            Find a book
          </label>
          <div className="bible-search-field">
            <Search size={18} />
            <input
              id="bible-book-search"
              value={bookQuery}
              onChange={(event) => setBookQuery(event.target.value)}
              placeholder="Search Bible books"
            />
          </div>
          <div className="bible-picker">
            <div className="bible-book-list" aria-label="Bible books">
              {BIBLE_BOOKS.filter((book) =>
                book.name.toLowerCase().includes(bookQuery.toLowerCase()),
              ).map((book, index) => (
                <button
                  key={book.name}
                  className={pickerBook === book.name ? "is-selected" : ""}
                  onClick={() => setPickerBook(book.name)}
                  aria-pressed={pickerBook === book.name}
                >
                  {index === 0 && !bookQuery && <small>OLD TESTAMENT</small>}
                  {book.name === "Matthew" && !bookQuery && (
                    <small>NEW TESTAMENT</small>
                  )}
                  {book.name}
                </button>
              ))}
              {!BIBLE_BOOKS.some((book) =>
                book.name.toLowerCase().includes(bookQuery.toLowerCase()),
              ) && <p>No matching books.</p>}
            </div>
            <div className="bible-chapter-picker">
              <h3>{pickerBook}</h3>
              <p>Choose a chapter</p>
              <div className="bible-chapter-grid">
                {Array.from(
                  {
                    length: BIBLE_BOOKS.find(
                      (book) => book.name === pickerBook,
                    )!.chapters,
                  },
                  (_, index) => index + 1,
                ).map((chapter) => (
                  <button
                    key={chapter}
                    className={
                      reference.book === pickerBook &&
                      reference.chapter === chapter
                        ? "is-selected"
                        : ""
                    }
                    aria-label={`${pickerBook} chapter ${chapter}`}
                    onClick={() => navigate({ book: pickerBook, chapter })}
                  >
                    {chapter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
      {panel === "version" && (
        <Modal
          title="Bible version"
          onClose={() => setPanel(null)}
          className="bible-dialog"
        >
          <p className="bible-dialog-description">Choose your translation.</p>
          <div className="bible-version-list">
            {BIBLE_VERSIONS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  stopSpeech();
                  setVersion(item.id);
                  setPanel(null);
                }}
                aria-pressed={version === item.id}
              >
                <strong>{item.abbreviation}</strong>
                <span>{item.name}</span>
                {version === item.id && <Check size={19} />}
              </button>
            ))}
          </div>
        </Modal>
      )}
      {panel === "search" && (
        <Modal
          title="Search Bible"
          onClose={() => setPanel(null)}
          className="bible-dialog"
        >
          <form onSubmit={searchPassage}>
            <label className="bible-field-label" htmlFor="bible-search">
              Reference or words in {chapterTitle}
            </label>
            <div className="bible-search-field">
              <Search size={18} />
              <input
                id="bible-search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setSearchError("");
                }}
                placeholder="e.g. Proverbs 24:33–34"
                autoComplete="off"
              />
              <button type="submit" aria-label="Go to Bible reference">
                <ChevronRight size={20} />
              </button>
            </div>
          </form>
          {searchError && (
            <p className="bible-search-error" role="alert">
              {searchError}
            </p>
          )}
          {referenceResult && (
            <button
              className="bible-search-result"
              onClick={() => {
                navigate(referenceResult);
                setSearch("");
              }}
            >
              <strong>
                Go to {referenceResult.book} {referenceResult.chapter}
                {referenceResult.verse
                  ? `:${referenceResult.verse}${referenceResult.endVerse ? `–${referenceResult.endVerse}` : ""}`
                  : ""}
              </strong>
              <ChevronRight size={20} />
            </button>
          )}
          {!referenceResult && search.trim().length > 1 && (
            <div className="bible-search-results">
              <p>
                {textMatches.length}{" "}
                {textMatches.length === 1 ? "match" : "matches"} in{" "}
                {chapterTitle}
              </p>
              {textMatches.map((verse) => (
                <button
                  className="bible-search-result"
                  key={verse.verse}
                  onClick={() => {
                    navigate({
                      ...reference,
                      verse: verse.verse,
                      endVerse: undefined,
                    });
                    setSearch("");
                  }}
                >
                  <strong>
                    {chapterTitle}:{verse.verse}
                  </strong>
                  <span>{verse.text}</span>
                </button>
              ))}
            </div>
          )}
          {!search && (
            <p className="bible-dialog-description">
              Open any book and chapter by reference, or find a word in the
              chapter you’re reading.
            </p>
          )}
        </Modal>
      )}
      {panel === "options" && (
        <Modal
          title="Reading options"
          onClose={() => setPanel(null)}
          className="bible-dialog"
        >
          <div className="bible-font-control">
            <span>Text size</span>
            <button
              className="icon-button"
              aria-label="Decrease Bible text size"
              disabled={fontSize <= 14}
              onClick={() => {
                const next = fontSize - 2;
                setFontSize(next);
                try {
                  localStorage.setItem("gnd-local-bible-font", String(next));
                } catch {
                  /* Optional preference. */
                }
              }}
            >
              <span className="bible-small-a">A</span>
            </button>
            <span>{fontSize}</span>
            <button
              className="icon-button"
              aria-label="Increase Bible text size"
              disabled={fontSize >= 22}
              onClick={() => {
                const next = fontSize + 2;
                setFontSize(next);
                try {
                  localStorage.setItem("gnd-local-bible-font", String(next));
                } catch {
                  /* Optional preference. */
                }
              }}
            >
              <span className="bible-large-a">A</span>
            </button>
          </div>
          <button
            className="bible-option-row"
            onClick={() => setPanel("highlights")}
          >
            <Highlighter size={20} />
            <span>My highlights</span>
            <span>{Object.keys(highlights).length}</span>
            <ChevronRight size={18} />
          </button>
          <button
            className="bible-option-row"
            disabled={!verses.length}
            onClick={() => {
              if (speechState !== "idle") stopSpeech();
              else startSpeech();
              setPanel(null);
            }}
          >
            {speechState !== "idle" ? <Pause size={20} /> : <Play size={20} />}
            <span>
              {speechState !== "idle"
                ? "Stop spoken reading"
                : "Listen to this chapter"}
            </span>
            <ChevronRight size={18} />
          </button>
          <p className="bible-dialog-description">
            Select a verse to highlight or copy it. Highlights are saved on this
            device. Spoken reading uses your browser’s voice.
          </p>
        </Modal>
      )}
      {panel === "highlights" && (
        <Modal
          title="My highlights"
          onClose={() => setPanel(null)}
          className="bible-dialog"
        >
          {!Object.keys(highlights).length ? (
            <div className="bible-empty">
              <Highlighter size={30} />
              <p>Your highlighted verses will appear here.</p>
              <p>Select a verse while reading, then choose a color.</p>
            </div>
          ) : (
            <div className="bible-saved-highlights">
              {Object.entries(highlights).map(([key, saved]) => (
                <div
                  className={`bible-saved-highlight bible-highlight-${saved.color}`}
                  key={key}
                >
                  <button
                    onClick={() => {
                      setVersion(saved.version);
                      navigate({
                        book: saved.book,
                        chapter: saved.chapter,
                        verse: saved.verse,
                      });
                    }}
                  >
                    <strong>
                      {saved.book} {saved.chapter}:{saved.verse} ·{" "}
                      {saved.version.toUpperCase()}
                    </strong>
                    <span>{saved.text}</span>
                  </button>
                  <button
                    className="icon-button"
                    aria-label={`Remove highlight ${saved.book} ${saved.chapter}:${saved.verse}`}
                    onClick={() => {
                      const next = { ...highlights };
                      delete next[key];
                      saveHighlights(next);
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </Modal>
      )}
    </section>
  );
}

export default Bible;
