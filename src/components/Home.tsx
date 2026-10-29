import { useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Headphones,
  HeartHandshake,
  Menu,
  Moon,
  Pause,
  Search,
  Share2,
  Sun,
  Users,
} from "lucide-react";
import type { Audience, Devotional } from "../types";
import { storyTitles, todayFor } from "../data";
import { ReadingShareDialog, useDevotionalNarration } from "./Reader";
import "./home.css";
import { HomeStoreCard } from "./HomeStoreCard";
import type { Product } from "../catalog";

interface HomeProps {
  audience: Audience;
  onAudience: (audience: Audience) => void;
  onRead: (devotional?: Devotional) => void;
  onSearch: () => void;
  onProfile: () => void;
  onTheme: () => void;
  dark: boolean;
  onPartner: () => void;
  onAlarm: () => void;
  onStories: () => void;
  completed: boolean;
  onStore: () => void;
  onProduct: (product: Product) => void;
}

export function Home({
  audience,
  onAudience,
  onRead,
  onSearch,
  onProfile,
  onTheme,
  dark,
  onPartner,
  onAlarm,
  onStories,
  completed,
  onStore,
  onProduct,
}: HomeProps) {
  const devotional = todayFor(audience);
  const narration = useDevotionalNarration(devotional);
  const [shareOpen, setShareOpen] = useState(false);
  const [railIndex, setRailIndex] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);
  function cardOffsets() {
    const rail = railRef.current;
    if (!rail) return [];
    const center = rail.getBoundingClientRect().left + rail.clientWidth / 2;
    return Array.from(rail.children).map((card) => {
      const rect = card.getBoundingClientRect();
      return Math.min(
        rail.scrollWidth - rail.clientWidth,
        Math.max(0, rect.left + rect.width / 2 - center + rail.scrollLeft),
      );
    });
  }
  function updateRailIndex() {
    const rail = railRef.current;
    if (!rail) return;
    const offsets = cardOffsets();
    const closest = offsets.reduce(
      (best, offset, index) =>
        Math.abs(offset - rail.scrollLeft) <
        Math.abs(offsets[best] - rail.scrollLeft)
          ? index
          : best,
      0,
    );
    setRailIndex(closest);
  }
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const observer = new ResizeObserver(updateRailIndex);
    observer.observe(rail);
    return () => observer.disconnect();
  }, []);
  function selectRailCard(index: number) {
    railRef.current?.scrollTo({
      left: cardOffsets()[index],
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  const progress = completed ? 100 : Math.round(narration.progress * 100);

  return (
    <div className="home-screen screen">
      <header className="home-header">
        <button
          type="button"
          className="home-profile"
          onClick={onProfile}
          aria-label="Open your profile"
        >
          <img src="/assets/profile.png" alt="" width="44" height="44" />
          <span>
            <strong>GoodNewsToYou</strong>
            <em>Reader</em>
          </span>
        </button>
        <div className="home-header-actions">
          <button
            type="button"
            className="icon-button home-theme"
            onClick={onTheme}
            aria-label={dark ? "Use light theme" : "Use dark theme"}
          >
            {dark ? <Sun size={22} /> : <Moon size={22} />}
          </button>
          <button
            type="button"
            className="glass-button home-partner"
            aria-label="Partner Now"
            onClick={onPartner}
          >
            <HeartHandshake size={19} />
            <span>
              Partner<span className="home-partner-now"> Now</span>
            </span>
          </button>
          <button
            type="button"
            className="icon-button home-menu"
            onClick={onProfile}
            aria-label="Open menu"
          >
            <Menu size={23} />
          </button>
        </div>
      </header>

      <div className="home-audience-row">
        <button
          type="button"
          className="home-search"
          onClick={onSearch}
          aria-label="Search devotionals"
        >
          <Search size={21} />
        </button>
        <div
          className="home-audience-tabs"
          aria-label="Choose your reading audience"
        >
          {(["Adults", "Teens", "Kids"] as const).map((item) => (
            <button
              type="button"
              key={item}
              className={item === audience ? "is-active" : ""}
              aria-pressed={item === audience}
              onClick={() => onAudience(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <section className="home-hero" aria-labelledby="home-devotional-title">
        <img
          className="home-hero-image"
          src={devotional.image}
          alt=""
          fetchPriority="high"
        />
        <div className="home-hero-shade" />
        <span className="home-today-badge">
          <CheckCircle2 size={14} />
          {devotional.audience === "Kids"
            ? "Sample reading"
            : "Today’s reading"}
        </span>
        <div className="home-hero-content">
          <p className="home-hero-label">{devotional.category}</p>
          <h1 id="home-devotional-title">{devotional.title}</h1>
          <div
            className="home-reading-progress"
            aria-label={`${progress}% read`}
          >
            <span className="home-progress-track">
              <span style={{ width: `${progress}%` }} />
            </span>
            <span>{progress}% read</span>
          </div>
          <div className="home-waveform" aria-hidden="true">
            {[18, 28, 42, 23, 38, 31, 46, 36, 25, 42, 30, 18, 35, 24, 14].map(
              (height, index) => (
                <i key={index} style={{ height }} />
              ),
            )}
          </div>
          <div className="home-hero-actions">
            <button
              type="button"
              className="home-read-button"
              onClick={() => onRead(devotional)}
            >
              Read
            </button>
            <button
              type="button"
              className="home-listen-button"
              onClick={narration.toggle}
              aria-pressed={narration.state === "playing"}
            >
              {narration.state === "playing" ? (
                <Pause size={17} fill="currentColor" />
              ) : (
                <Headphones size={18} />
              )}
              {narration.state === "playing"
                ? "Pause"
                : narration.state === "paused"
                  ? "Resume"
                  : "Listen"}
            </button>
          </div>
        </div>
      </section>
      {narration.message && (
        <div className="home-audio-status" role="status">
          <span>{narration.message}</span>
          {narration.state !== "idle" && (
            <button type="button" onClick={narration.stop}>
              Stop audio
            </button>
          )}
        </div>
      )}

      <button type="button" className="home-reminder surface" onClick={onAlarm}>
        <img src="/assets/alarm.png" alt="" width="96" height="96" />
        <span className="home-reminder-copy">
          <strong>Prayer Reminder</strong>
          <span>Remember to lift your family in prayer today</span>
        </span>
      </button>

      <div
        className="home-card-rail"
        ref={railRef}
        onScroll={updateRailIndex}
        role="region"
        aria-label="Daily inspiration cards"
        aria-roledescription="carousel"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            selectRailCard(
              Math.max(
                0,
                Math.min(2, railIndex + (event.key === "ArrowRight" ? 1 : -1)),
              ),
            );
          }
        }}
      >
        <section
          className="home-verse-card surface"
          aria-labelledby="home-verse-title"
        >
          <div className="home-small-card-heading">
            <h2 id="home-verse-title">Verse of the day</h2>
          </div>
          <p className="home-verse-text">{devotional.scripture}</p>
          <p className="home-verse-reference">{devotional.scriptureRef}</p>
          <div className="home-verse-actions">
            <button type="button" onClick={() => onRead(devotional)}>
              Read <ChevronRight size={16} />
            </button>
            <button type="button" onClick={() => setShareOpen(true)}>
              Share <Share2 size={15} />
            </button>
          </div>
        </section>
        <HomeStoreCard onStore={onStore} onProduct={onProduct} />
        <button
          type="button"
          className="home-stories-card surface"
          onClick={onStories}
          aria-label="Blogs and testimonies: read stories of faith"
        >
          <span className="home-stories-icon">
            <Users size={30} />
          </span>
          <strong>Blogs &amp; Testimonies</strong>
          <span>Read stories of faith</span>
          <span className="home-story-ticker" aria-hidden="true">
            {[storyTitles.slice(0, 4), storyTitles.slice(4)].map(
              (row, index) => (
                <span className="home-story-ticker-row" key={index}>
                  {[...row, ...row].map((title, titleIndex) => (
                    <span key={titleIndex}>{title}</span>
                  ))}
                </span>
              ),
            )}
          </span>
        </button>
      </div>
      <div className="home-rail-navigation" aria-label="Card navigation">
        <button
          type="button"
          aria-label="Previous home card"
          disabled={railIndex === 0}
          onClick={() => selectRailCard(Math.max(0, railIndex - 1))}
        >
          <ChevronLeft size={18} />
        </button>
        <span aria-live="polite">{railIndex + 1} / 3</span>
        <button
          type="button"
          aria-label="Next home card"
          disabled={railIndex === 2}
          onClick={() => selectRailCard(Math.min(2, railIndex + 1))}
        >
          <ChevronRight size={18} />
        </button>
      </div>
      <ReadingShareDialog
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        title="Verse of the day"
        text={`${devotional.scripture}\n\n${devotional.scriptureRef}\nGoodNews Daily`}
      />
    </div>
  );
}

export default Home;
