import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Bookmark,
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Moon,
  Search,
  Sun,
  UserRound,
  X,
} from "lucide-react";
import { devotionals } from "../data";
import { libraryStories } from "../library-data";
import type { LibraryStory } from "../library-data";
import type { Devotional } from "../types";
import "./library.css";

type LibraryTab =
  | "All"
  | "Saved"
  | "Blogs"
  | "Testimonies"
  | "Outreaches"
  | "GND Readings"
  | "GND Show";
type Period = "All time" | "Today" | "This week" | "This month" | "This year";
interface LibraryProps {
  onRead: (devotional: Devotional) => void;
  saved: string[];
  onSave: (id: string) => void;
  onTheme: () => void;
  dark: boolean;
  onProfile: () => void;
  initialTab?: string;
  onNotes: () => void;
  onBible: () => void;
  onAlarm: () => void;
}

const tabs: LibraryTab[] = [
  "All",
  "Saved",
  "Blogs",
  "Testimonies",
  "Outreaches",
  "GND Readings",
  "GND Show",
];
const periods: Period[] = [
  "All time",
  "Today",
  "This week",
  "This month",
  "This year",
];
function initialLibraryTab(value?: string): LibraryTab {
  if (value?.toLowerCase() === "stories") return "Blogs";
  return (
    tabs.find((tab) => tab.toLowerCase() === value?.toLowerCase()) ?? "All"
  );
}
function withinPeriod(date: string, period: Period) {
  if (period === "All time") return true;
  const today = new Date();
  const itemDate = new Date(`${date}T12:00:00`);
  const start = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  if (period === "This week")
    start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
  if (period === "This month") start.setDate(1);
  if (period === "This year") start.setMonth(0, 1);
  const end = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1,
  );
  return itemDate >= start && itemDate < end;
}
function formatDate(value: string) {
  return new Date(`${value}T12:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
function StoryImage({
  story,
  className = "",
}: {
  story: LibraryStory;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`lib-story-image ${className}`}>
      {!failed ? (
        <img
          src={story.bgImg}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <>
          <img src="/assets/object-blogs.png" alt="" />
          <span>GoodNews Daily</span>
        </>
      )}
    </div>
  );
}

export function Library({
  onRead,
  saved,
  onSave,
  onTheme,
  dark,
  onProfile,
  initialTab,
  onNotes,
  onBible,
  onAlarm,
}: LibraryProps) {
  const [tab, setTab] = useState<LibraryTab>(() =>
    initialLibraryTab(initialTab),
  );
  const [period, setPeriod] = useState<Period>("All time");
  const [query, setQuery] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);
  const [menuOpen, setMenuOpen] = useState(true);
  const [selectedStory, setSelectedStory] = useState<LibraryStory | null>(null);
  useEffect(() => {
    setTab(initialLibraryTab(initialTab));
    setSelectedStory(null);
    if (initialTab?.toLowerCase() === "search") searchInput.current?.focus();
  }, [initialTab]);
  const featured = devotionals[0]!;
  const search = query.trim().toLocaleLowerCase();
  const readings = useMemo(
    () =>
      devotionals.filter(
        (item) =>
          ["All", "Saved", "GND Readings"].includes(tab) &&
          (tab !== "Saved" || saved.includes(item.id)) &&
          withinPeriod(item.date, period) &&
          `${item.title} ${item.audience} ${item.scriptureRef} ${item.category}`
            .toLocaleLowerCase()
            .includes(search),
      ),
    [tab, saved, period, search],
  );
  const stories = useMemo(
    () =>
      libraryStories.filter((item) => {
        const categoryMatches =
          tab === "All" ||
          tab === "Blogs" ||
          tab === "Saved" ||
          (tab === "Outreaches" && !item.title.includes("YouTube")) ||
          (tab === "Testimonies" &&
            item.title.toLowerCase().includes("testimonies")) ||
          (tab === "GND Show" && item.title.includes("YouTube"));
        return (
          categoryMatches &&
          (tab !== "Saved" || saved.includes(item.id)) &&
          withinPeriod(item.date, period) &&
          `${item.title} ${item.excerpt} ${item.category}`
            .toLocaleLowerCase()
            .includes(search)
        );
      }),
    [tab, saved, period, search],
  );
  const count = readings.length + stories.length;
  const hasSavedItems = [...devotionals, ...libraryStories].some((item) =>
    saved.includes(item.id),
  );
  const emptySavedCollection = tab === "Saved" && !hasSavedItems && !query;
  function chooseTab(next: LibraryTab) {
    setTab(next);
    setSelectedStory(null);
  }
  function openStory(story: LibraryStory) {
    setSelectedStory(story);
    window.scrollTo({ top: 0 });
  }
  function clearFilters() {
    setQuery("");
    setPeriod("All time");
    setTab("All");
  }

  if (selectedStory) {
    const storyIndex = libraryStories.findIndex(
      (story) => story.id === selectedStory.id,
    );
    return (
      <main className="lib-screen lib-story-detail">
        <header className="lib-detail-header">
          <button
            className="icon-button"
            aria-label="Back to library"
            onClick={() => setSelectedStory(null)}
          >
            <ArrowLeft size={22} />
          </button>
          <span>Blogs</span>
          <div className="lib-header-actions">
            <button
              className={`icon-button ${saved.includes(selectedStory.id) ? "lib-is-saved" : ""}`}
              aria-label={
                saved.includes(selectedStory.id)
                  ? "Unsave article"
                  : "Save article"
              }
              aria-pressed={saved.includes(selectedStory.id)}
              onClick={() => onSave(selectedStory.id)}
            >
              <Bookmark
                size={21}
                fill={
                  saved.includes(selectedStory.id) ? "currentColor" : "none"
                }
              />
            </button>
            <button
              className="icon-button"
              aria-label={
                dark ? "Switch to light theme" : "Switch to dark theme"
              }
              onClick={onTheme}
            >
              {dark ? <Sun size={21} /> : <Moon size={21} />}
            </button>
          </div>
        </header>
        <div className="lib-article-navigation">
          <button
            aria-label="Previous article"
            disabled={storyIndex === 0}
            onClick={() => openStory(libraryStories[storyIndex - 1]!)}
          >
            <ChevronLeft size={20} />
          </button>
          <span>
            {storyIndex + 1} of {libraryStories.length} articles
          </span>
          <button
            aria-label="Next article"
            disabled={storyIndex === libraryStories.length - 1}
            onClick={() => openStory(libraryStories[storyIndex + 1]!)}
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="lib-article-hero">
          <StoryImage key={selectedStory.id} story={selectedStory} />
          <h1>{selectedStory.title}</h1>
        </div>
        <article className="lib-article-body">
          <p className="lib-article-byline">
            {selectedStory.author} · {formatDate(selectedStory.date)}
          </p>
          <p className="lib-eyebrow">Article summary · Global Reach</p>
          {selectedStory.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <a
            className="lib-source-link"
            href={selectedStory.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read full article on GoodNews Daily <ArrowUpRight size={20} />
          </a>
        </article>
        <section className="lib-more-stories">
          <h2>More to read</h2>
          <div className="lib-story-grid">
            {libraryStories
              .filter((story) => story.id !== selectedStory.id)
              .slice(0, 2)
              .map((story) => (
                <button
                  className="lib-story-card"
                  key={story.id}
                  onClick={() => openStory(story)}
                >
                  <StoryImage story={story} />
                  <span className="lib-story-copy">
                    <strong>{story.title}</strong>
                    <small>
                      Article summary <ArrowUpRight size={14} />
                    </small>
                  </span>
                </button>
              ))}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className={`lib-screen ${menuOpen ? "lib-tray-open" : ""}`}>
      <header className="lib-header">
        <h1>Library</h1>
        <div className="lib-header-actions">
          <button
            className="icon-button"
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            onClick={onTheme}
          >
            {dark ? <Sun size={22} /> : <Moon size={22} />}
          </button>
          <button
            className="icon-button"
            aria-label="Open profile"
            onClick={onProfile}
          >
            <UserRound size={22} />
          </button>
        </div>
      </header>
      <section
        className="lib-featured-section"
        aria-labelledby="lib-featured-title"
      >
        <h2 id="lib-featured-title">Featured readings</h2>
        <div className="lib-featured-card">
          <button
            className="lib-featured-open"
            onClick={() => onRead(featured)}
            aria-label={`Read ${featured.title}`}
          >
            <img src={featured.image} alt="" />
            <strong>{featured.title}</strong>
            <span className="lib-featured-meta">
              <BookOpen size={12} /> Devotional · {featured.minutes} min
            </span>
          </button>
          <button
            className={`lib-save-button ${saved.includes(featured.id) ? "lib-is-saved" : ""}`}
            onClick={() => onSave(featured.id)}
            aria-label={
              saved.includes(featured.id)
                ? "Unsave featured reading"
                : "Save featured reading"
            }
            aria-pressed={saved.includes(featured.id)}
          >
            <Bookmark
              size={18}
              fill={saved.includes(featured.id) ? "currentColor" : "none"}
            />
          </button>
        </div>
      </section>
      <section
        className="lib-collection-section"
        aria-labelledby="lib-collection-title"
      >
        <div className="lib-collection-heading">
          <h2 id="lib-collection-title">Explore the collection</h2>
          <span role="status">
            {count} {count === 1 ? "reading" : "readings"}
          </span>
        </div>
        <div className="lib-filter-tabs" aria-label="Library categories">
          {tabs.map((item) => (
            <button
              className={tab === item ? "lib-active" : ""}
              key={item}
              aria-pressed={tab === item}
              onClick={() => chooseTab(item)}
            >
              {item === "Saved" && <Bookmark size={13} />}
              {item}
            </button>
          ))}
        </div>
        <div className="lib-search">
          <Search size={19} />
          <input
            ref={searchInput}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search library"
            placeholder="Search devotionals, scriptures…"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear library search"
            >
              <X size={17} />
            </button>
          )}
        </div>
        <p className="lib-period-label">Period</p>
        <div className="lib-period-filters" aria-label="Publication period">
          {periods.map((item) => (
            <button
              key={item}
              aria-pressed={period === item}
              className={period === item ? "lib-active" : ""}
              onClick={() => setPeriod(item)}
            >
              {item}
            </button>
          ))}
        </div>
        {count === 0 ? (
          <div className="lib-empty-state">
            <BookOpen size={31} strokeWidth={1.3} />
            <h3>
              {emptySavedCollection
                ? "Your saved reads live here"
                : "No matching reads"}
            </h3>
            <p>
              {emptySavedCollection
                ? "Tap the bookmark on a reading or story to keep it in your collection."
                : "Try another search or a wider publication period."}
            </p>
            <button className="glass-button" onClick={clearFilters}>
              Browse all
            </button>
          </div>
        ) : (
          <div className="lib-results">
            {readings.length > 0 && (
              <div className="lib-reading-list">
                {readings.map((reading) => (
                  <div className="lib-reading-card" key={reading.id}>
                    <button
                      className="lib-reading-open"
                      onClick={() => onRead(reading)}
                    >
                      <img src={reading.image} alt="" />
                      <span>
                        <small>{reading.audience} · Daily Devotional</small>
                        <strong>{reading.title}</strong>
                        <span>
                          {formatDate(reading.date)} · {reading.minutes} min
                          read
                        </span>
                      </span>
                      <ChevronRight size={19} />
                    </button>
                    <button
                      className={`lib-save-button ${saved.includes(reading.id) ? "lib-is-saved" : ""}`}
                      onClick={() => onSave(reading.id)}
                      aria-label={`${saved.includes(reading.id) ? "Unsave" : "Save"} ${reading.title}`}
                      aria-pressed={saved.includes(reading.id)}
                    >
                      <Bookmark
                        size={18}
                        fill={
                          saved.includes(reading.id) ? "currentColor" : "none"
                        }
                      />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {stories.length > 0 && (
              <div className="lib-story-grid">
                {stories.map((story) => (
                  <div className="lib-story-card" key={story.id}>
                    <button
                      className="lib-story-open"
                      onClick={() => openStory(story)}
                    >
                      <StoryImage story={story} />
                      <span className="lib-story-copy">
                        <small>{story.category}</small>
                        <strong>{story.title}</strong>
                        <span>{formatDate(story.date)} · Article summary</span>
                      </span>
                    </button>
                    <button
                      className={`lib-save-button ${saved.includes(story.id) ? "lib-is-saved" : ""}`}
                      onClick={() => onSave(story.id)}
                      aria-label={`${saved.includes(story.id) ? "Unsave" : "Save"} ${story.title}`}
                      aria-pressed={saved.includes(story.id)}
                    >
                      <Bookmark
                        size={18}
                        fill={
                          saved.includes(story.id) ? "currentColor" : "none"
                        }
                      />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
      <aside
        className={`lib-category-tray ${menuOpen ? "" : "lib-collapsed"}`}
        aria-label="Library shortcuts"
      >
        <div className="lib-tray-heading">
          <span className="lib-tray-label">Library</span>
          <button
            className="lib-tray-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={
              menuOpen
                ? "Collapse library categories"
                : "Expand library categories"
            }
            aria-expanded={menuOpen}
          >
            {menuOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
        </div>
        {menuOpen && (
          <div className="lib-tray-items">
            {[
              {
                label: "Daily Devotional",
                image: "object-daily-magazine.png",
                action: () => chooseTab("GND Readings"),
                active: tab === "GND Readings",
              },
              { label: "Bible", image: "object-bible.png", action: onBible },
              {
                label: "Prayer",
                image: "object-prayer-hands.png",
                action: onAlarm,
              },
              {
                label: "Blogs",
                image: "object-blogs.png",
                action: () => chooseTab("Blogs"),
                active: tab === "Blogs",
              },
              {
                label: "Testimonies",
                image: "object-testimonies.png",
                action: () => chooseTab("Testimonies"),
                active: tab === "Testimonies",
              },
              { label: "Notes", image: "object-notes.png", action: onNotes },
            ].map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className={item.active ? "lib-active" : ""}
              >
                <img src={`/assets/${item.image}`} alt="" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </aside>
    </main>
  );
}
