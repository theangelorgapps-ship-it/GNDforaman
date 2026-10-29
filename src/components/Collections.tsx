import { useMemo, useState } from "react";
import {
  ArrowDownWideNarrow,
  ArrowLeft,
  BookOpen,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Moon,
  Search,
  Sun,
  X,
} from "lucide-react";
import { devotionals } from "../data";
import type { Audience, Devotional } from "../types";
import "./library.css";

interface CollectionsProps {
  audience: Audience;
  onAudience: (audience: Audience) => void;
  onRead: (devotional: Devotional) => void;
  onBack: () => void;
  onTheme: () => void;
  dark: boolean;
}
const audiences: Audience[] = ["Adults", "Teens", "Kids"];
const years = ["2026", "2025", "2024", "2023", "2022", "2021"];
type CollectionLevel = "years" | "issues" | "readings";

export function Collections({
  audience,
  onAudience,
  onRead,
  onBack,
  onTheme,
  dark,
}: CollectionsProps) {
  const [query, setQuery] = useState("");
  const [ascending, setAscending] = useState(false);
  const [level, setLevel] = useState<CollectionLevel>("years");
  const [year, setYear] = useState("2026");
  const [issue, setIssue] = useState("2026-10");
  const [trayOpen, setTrayOpen] = useState(true);
  const search = query.trim().toLocaleLowerCase();
  const audienceReadings = useMemo(
    () => devotionals.filter((reading) => reading.audience === audience),
    [audience],
  );
  const availableYears = [
    ...new Set(audienceReadings.map((reading) => reading.date.slice(0, 4))),
  ]
    .filter(
      (value) =>
        !search ||
        `${value} ${audience} GoodNews Daily`
          .toLocaleLowerCase()
          .includes(search) ||
        audienceReadings.some(
          (reading) =>
            reading.date.startsWith(value) &&
            `${reading.title} ${issueName(reading.date.slice(0, 7))}`
              .toLocaleLowerCase()
              .includes(search),
        ),
    )
    .sort((a, b) => (ascending ? a.localeCompare(b) : b.localeCompare(a)));
  const availableIssues = [
    ...new Set(
      audienceReadings
        .filter((reading) => reading.date.startsWith(year))
        .map((reading) => reading.date.slice(0, 7)),
    ),
  ]
    .filter(
      (value) =>
        !search ||
        `${issueName(value)} ${value} ${audience}`
          .toLocaleLowerCase()
          .includes(search) ||
        audienceReadings.some(
          (reading) =>
            reading.date.startsWith(value) &&
            reading.title.toLocaleLowerCase().includes(search),
        ),
    )
    .sort((a, b) => (ascending ? a.localeCompare(b) : b.localeCompare(a)));
  const issueReadings = audienceReadings
    .filter(
      (reading) =>
        reading.date.startsWith(issue) &&
        (!search ||
          `${reading.title} ${reading.scriptureRef} ${reading.date}`
            .toLocaleLowerCase()
            .includes(search)),
    )
    .sort((a, b) =>
      ascending ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date),
    );
  function issueName(value: string) {
    return new Date(`${value}-01T12:00:00`).toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric",
    });
  }
  function back() {
    setQuery("");
    if (level === "readings") setLevel("issues");
    else if (level === "issues") setLevel("years");
    else onBack();
  }
  function chooseYear(value: string) {
    setYear(value);
    setLevel("issues");
    setQuery("");
    window.scrollTo({ top: 0 });
  }
  const isEmpty =
    level === "years"
      ? availableYears.length === 0
      : level === "issues"
        ? availableIssues.length === 0
        : issueReadings.length === 0;

  return (
    <main className="lib-screen col-screen">
      <header className="col-header">
        <button
          className="icon-button"
          aria-label={
            level === "years"
              ? "Back from collections"
              : level === "issues"
                ? "Back to years"
                : "Back to issues"
          }
          onClick={back}
        >
          <ArrowLeft size={23} />
        </button>
        <h1>Collections</h1>
        <button
          className="icon-button"
          aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
          onClick={onTheme}
        >
          {dark ? <Sun size={22} /> : <Moon size={22} />}
        </button>
      </header>
      <div className="col-tools">
        <div className="lib-search">
          <Search size={19} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search collections"
            aria-label="Search collections"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear collections search"
            >
              <X size={17} />
            </button>
          )}
        </div>
        <button
          className="icon-button col-sort"
          aria-label={ascending ? "Sort newest first" : "Sort oldest first"}
          title={ascending ? "Oldest first" : "Newest first"}
          onClick={() => setAscending(!ascending)}
        >
          <ArrowDownWideNarrow
            size={21}
            className={ascending ? "col-sort-ascending" : ""}
          />
        </button>
      </div>
      <div className="col-audience-tabs" aria-label="Collection audience">
        {audiences.map((value) => (
          <button
            key={value}
            aria-pressed={value === audience}
            onClick={() => onAudience(value)}
            className={value === audience ? "col-active" : ""}
          >
            {value}
          </button>
        ))}
      </div>
      <section className="col-content" aria-label="Issue collections">
        {level !== "years" && (
          <div className="col-breadcrumb">
            <button
              onClick={() => {
                setLevel("years");
                setQuery("");
              }}
            >
              All collections
            </button>
            <ChevronRight size={14} />
            <button
              onClick={() => {
                setLevel("issues");
                setQuery("");
              }}
            >
              {year}
            </button>
            {level === "readings" && (
              <>
                <ChevronRight size={14} />
                <span>{issueName(issue).split(" ")[0]}</span>
              </>
            )}
          </div>
        )}
        <div
          className={`col-section-heading ${level === "years" ? "col-browse-heading" : ""}`}
        >
          <h2>
            {level === "years"
              ? "Browse by year"
              : level === "issues"
                ? year
                : issueName(issue)}
          </h2>
          {level !== "years" && <span>{audience}</span>}
        </div>
        {isEmpty ? (
          <div className="lib-empty-state col-empty">
            <img src="/assets/object-daily-magazine.png" alt="" />
            <h3>
              {query
                ? "No matching collections"
                : `No ${year} issues available`}
            </h3>
            <p>
              {query
                ? "Try a year, month, or reading title."
                : "Your available readings are in the 2026 collection."}
            </p>
            <button
              className="glass-button"
              onClick={() => {
                setQuery("");
                if (!query) {
                  setYear("2026");
                  setLevel("years");
                }
              }}
            >
              {query ? "Clear search" : "Browse 2026"}
            </button>
          </div>
        ) : (
          <div className="col-cards">
            {level === "years" &&
              availableYears.map((value) => {
                const issuesCount = new Set(
                  audienceReadings
                    .filter((reading) => reading.date.startsWith(value))
                    .map((reading) => reading.date.slice(0, 7)),
                ).size;
                return (
                  <button
                    className="col-year-card"
                    key={value}
                    onClick={() => chooseYear(value)}
                    aria-label={`Open ${value} ${audience} collection`}
                  >
                    <div className="col-year-meta">
                      <span>Year collection</span>
                      <span>
                        <BookOpen size={12} />
                        {issuesCount} {issuesCount === 1 ? "issue" : "issues"}
                      </span>
                    </div>
                    <div className="col-year-copy">
                      <strong>{value}</strong>
                      <small>GoodNews Daily · {audience}</small>
                    </div>
                    <div className="col-book-scene">
                      <div className="col-book">
                        <span className="col-book-brand">
                          GoodNews
                          <br />
                          Daily
                        </span>
                        <strong>{value}</strong>
                      </div>
                    </div>
                  </button>
                );
              })}
            {level === "issues" &&
              availableIssues.map((value) => (
                <button
                  className="col-issue-card"
                  key={value}
                  onClick={() => {
                    setIssue(value);
                    setLevel("readings");
                    setQuery("");
                  }}
                >
                  <div className="col-issue-cover">
                    <img
                      src={
                        audience === "Adults"
                          ? "/assets/issue-cover.webp"
                          : audience === "Teens"
                            ? "/assets/teens.jpg"
                            : "/assets/kids.jpg"
                      }
                      alt=""
                    />
                  </div>
                  <span>
                    <strong>{issueName(value)}</strong>
                    <small>GoodNews Daily · {audience}</small>
                    <span>
                      {
                        audienceReadings.filter((reading) =>
                          reading.date.startsWith(value),
                        ).length
                      }{" "}
                      available reading
                    </span>
                  </span>
                  <ChevronRight size={21} />
                </button>
              ))}
            {level === "readings" &&
              issueReadings.map((reading) => (
                <button
                  className="col-devotional-card"
                  key={reading.id}
                  onClick={() => onRead(reading)}
                >
                  <span className="col-date-tile">
                    <small>
                      {new Date(`${reading.date}T12:00:00`).toLocaleDateString(
                        "en-GB",
                        { month: "short" },
                      )}
                    </small>
                    <strong>{reading.date.slice(-2)}</strong>
                  </span>
                  <span>
                    <small>
                      {reading.audience} · {reading.minutes} min read
                    </small>
                    <strong>{reading.title}</strong>
                    <span>{reading.scriptureRef}</span>
                  </span>
                  <ChevronRight size={21} />
                </button>
              ))}
          </div>
        )}
      </section>
      <aside
        className={`col-year-tray ${trayOpen ? "" : "col-tray-collapsed"}`}
        aria-label="Collection years"
      >
        <div className="col-tray-heading">
          <span>Issue Collection</span>
          <button
            className="col-tray-toggle"
            aria-label={
              trayOpen ? "Collapse collection years" : "Expand collection years"
            }
            aria-expanded={trayOpen}
            onClick={() => setTrayOpen(!trayOpen)}
          >
            {trayOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
        </div>
        {trayOpen && (
          <nav
            className="col-year-tray-items"
            aria-label="Browse collection years"
          >
            {years.map((value) => (
              <button
                key={value}
                className={value === year ? "col-active" : ""}
                aria-pressed={value === year}
                onClick={() => chooseYear(value)}
              >
                <img src="/assets/object-daily-magazine.png" alt="" />
                <span>{value}</span>
              </button>
            ))}
          </nav>
        )}
      </aside>
    </main>
  );
}
