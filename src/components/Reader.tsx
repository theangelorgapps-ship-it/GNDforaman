import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  Bookmark,
  BookOpen,
  Check,
  CheckCheck,
  ChevronRight,
  Copy,
  Minus,
  Pause,
  Play,
  Plus,
  Share2,
  Type,
  X,
} from "lucide-react";
import type { CSSProperties } from "react";
import type { Devotional } from "../types";
import "./reader.css";

interface ReaderProps {
  devotional: Devotional;
  onBack: () => void;
  saved: boolean;
  onSave: () => void;
  completed: boolean;
  onComplete: () => void;
  onBible: (reference?: string) => void;
}

type NarrationState = "idle" | "playing" | "paused";

/** Uses the device's speech engine; no recorded audio or remote service is implied. */
export function useDevotionalNarration(devotional: Devotional) {
  const [state, setState] = useState<NarrationState>("idle");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const utterance = useRef<SpeechSynthesisUtterance | null>(null);
  const text = useMemo(
    () =>
      [
        devotional.title,
        devotional.scriptureRef,
        devotional.scripture,
        ...devotional.body,
        "Prayer.",
        devotional.prayer,
        devotional.declaration
          ? `Prophetic declaration. ${devotional.declaration}`
          : "",
        devotional.furtherStudy
          ? `Further study. ${devotional.furtherStudy}`
          : "",
      ]
        .filter(Boolean)
        .join("\n\n"),
    [devotional],
  );

  const stop = useCallback(() => {
    if (utterance.current) {
      utterance.current.onend = null;
      utterance.current.onerror = null;
      utterance.current.onboundary = null;
      utterance.current = null;
      window.speechSynthesis?.cancel();
    }
    setState("idle");
    setMessage("Reading stopped.");
  }, []);

  useEffect(() => {
    setState("idle");
    setProgress(0);
    setMessage("");
    return () => {
      if (utterance.current) {
        utterance.current.onend = null;
        utterance.current.onerror = null;
        utterance.current.onboundary = null;
        utterance.current = null;
        window.speechSynthesis?.cancel();
      }
    };
  }, [devotional.id]);

  const toggle = useCallback(() => {
    if (
      !("speechSynthesis" in window) ||
      !("SpeechSynthesisUtterance" in window)
    ) {
      setMessage(
        "Audio is not available in this browser. You can still read the complete devotional.",
      );
      return;
    }
    const engine = window.speechSynthesis;
    if (state === "playing") {
      engine.pause();
      setState("paused");
      setMessage("Reading paused.");
      return;
    }
    if (state === "paused") {
      engine.resume();
      setState("playing");
      setMessage("Reading aloud using your device’s voice.");
      return;
    }
    engine.cancel();
    const next = new SpeechSynthesisUtterance(text);
    next.lang = "en-GB";
    next.rate = 0.95;
    next.onboundary = (event) =>
      setProgress(Math.min(1, event.charIndex / text.length));
    next.onend = () => {
      utterance.current = null;
      setState("idle");
      setProgress(1);
      setMessage("Reading finished.");
    };
    next.onerror = (event) => {
      utterance.current = null;
      setState("idle");
      if (event.error !== "canceled" && event.error !== "interrupted") {
        setMessage(
          "Your device could not play the reading. Please try again or read the text.",
        );
      } else {
        setMessage("Reading stopped.");
      }
    };
    utterance.current = next;
    setProgress(0);
    setMessage("Reading aloud using your device’s voice.");
    setState("playing");
    engine.speak(next);
  }, [state, text]);

  return { state, progress, message, toggle, stop };
}

export function ReadingShareDialog({
  open,
  onClose,
  title,
  text,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  text: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const textArea = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (open) {
      setMessage("");
      if (!dialog.current?.open) dialog.current?.showModal();
    } else if (dialog.current?.open) {
      dialog.current.close();
    }
  }, [open]);

  async function copyText() {
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(text);
      setMessage("Copied to clipboard.");
    } catch {
      textArea.current?.focus();
      textArea.current?.select();
      setMessage(
        "Select and copy the text above to share it. Your browser did not allow automatic copying.",
      );
    }
  }

  async function nativeShare() {
    try {
      await navigator.share({ title, text });
      setMessage("Shared.");
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) {
        setMessage(
          "Sharing is not available right now. You can copy the text instead.",
        );
      }
    }
  }

  return (
    <dialog
      ref={dialog}
      className="reading-share-dialog"
      onCancel={onClose}
      onClose={onClose}
      aria-labelledby="reading-share-title"
      onClick={(event) => {
        if (event.target === dialog.current) onClose();
      }}
    >
      <div className="reading-share-heading">
        <h2 id="reading-share-title">Share some GoodNews</h2>
        <button
          type="button"
          className="icon-button"
          aria-label="Close share dialog"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>
      <p>Send a little encouragement to someone today.</p>
      <label className="sr-only" htmlFor="reading-share-text">
        Text to share
      </label>
      <textarea
        ref={textArea}
        id="reading-share-text"
        readOnly
        value={text}
        rows={7}
      />
      <div className="reading-share-actions">
        <button type="button" className="primary-button" onClick={copyText}>
          <Copy size={17} /> Copy text
        </button>
        {typeof navigator !== "undefined" &&
          typeof navigator.share === "function" && (
            <button
              type="button"
              className="glass-button"
              onClick={nativeShare}
            >
              <Share2 size={17} /> Share
            </button>
          )}
      </div>
      <p className="reading-share-status" role="status">
        {message}
      </p>
    </dialog>
  );
}

export function Reader({
  devotional,
  onBack,
  saved,
  onSave,
  completed,
  onComplete,
  onBible,
}: ReaderProps) {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [wideSpacing, setWideSpacing] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);
  const narration = useDevotionalNarration(devotional);
  const date = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${devotional.date}T12:00:00Z`));
  const shareText = `${devotional.title}\n\n${devotional.scripture}\n${devotional.scriptureRef}\n\nGoodNews Daily`;

  useEffect(() => {
    if (!optionsOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOptionsOpen(false);
    };
    const closeOutside = (event: PointerEvent) => {
      if (!optionsRef.current?.contains(event.target as Node))
        setOptionsOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [optionsOpen]);

  return (
    <div className="reader-screen">
      <section className="reader-hero" aria-labelledby="reader-title">
        <img className="reader-hero-image" src={devotional.image} alt="" />
        <div className="reader-hero-shade" />
        <div className="reader-toolbar">
          <button
            type="button"
            className="reader-tool"
            onClick={onBack}
            aria-label="Close devotional"
          >
            <X size={22} />
          </button>
          <div className="reader-tools">
            <button
              type="button"
              className="reader-tool"
              onClick={narration.toggle}
              aria-label={
                narration.state === "playing"
                  ? "Pause reading"
                  : narration.state === "paused"
                    ? "Resume reading"
                    : "Listen to devotional"
              }
              aria-pressed={narration.state === "playing"}
            >
              {narration.state === "playing" ? (
                <Pause size={19} fill="currentColor" />
              ) : (
                <Play size={19} fill="currentColor" />
              )}
            </button>
            <button
              type="button"
              className={`reader-tool${saved ? " is-saved" : ""}`}
              onClick={onSave}
              aria-label={saved ? "Remove saved devotional" : "Save devotional"}
              aria-pressed={saved}
            >
              <Bookmark size={21} fill={saved ? "currentColor" : "none"} />
            </button>
            <button
              type="button"
              className="reader-tool"
              onClick={() => setShareOpen(true)}
              aria-label="Share devotional"
            >
              <Share2 size={21} />
            </button>
            <div className="reader-options-wrap" ref={optionsRef}>
              <button
                type="button"
                className="reader-tool reader-font-trigger"
                onClick={() => setOptionsOpen((value) => !value)}
                aria-label="Reading appearance"
                aria-expanded={optionsOpen}
                aria-controls="reader-appearance"
              >
                Aa
              </button>
              {optionsOpen && (
                <div className="reader-options" id="reader-appearance">
                  <p>
                    <Type size={17} /> Reading appearance
                  </p>
                  <span className="reader-option-label">Text size</span>
                  <div className="reader-size-controls">
                    <button
                      type="button"
                      aria-label="Decrease text size"
                      disabled={fontSize <= 14}
                      onClick={() =>
                        setFontSize((value) => Math.max(14, value - 2))
                      }
                    >
                      <Minus size={18} />
                    </button>
                    <output aria-live="polite">{fontSize}px</output>
                    <button
                      type="button"
                      aria-label="Increase text size"
                      disabled={fontSize >= 28}
                      onClick={() =>
                        setFontSize((value) => Math.min(28, value + 2))
                      }
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  <button
                    type="button"
                    className="reader-spacing"
                    aria-pressed={wideSpacing}
                    onClick={() => setWideSpacing((value) => !value)}
                  >
                    Extra line spacing {wideSpacing && <Check size={16} />}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="reader-title-block">
          <p className="reader-eyebrow">
            {devotional.audience === "Kids"
              ? "GoodNews Daily · Sample reading"
              : "GoodNews Daily"}
          </p>
          <h1 id="reader-title">{devotional.title}</h1>
          <p className="reader-date">
            {date}
            <span aria-hidden="true">·</span>
            {devotional.minutes} min read
          </p>
        </div>
      </section>

      <div
        className="reader-content"
        style={
          {
            "--reader-font-size": `${fontSize}px`,
            "--reader-line-height": wideSpacing ? "2.1" : "1.8",
          } as CSSProperties
        }
      >
        {narration.message && (
          <div className="reader-audio-status" role="status">
            <span>{narration.message}</span>
            {narration.state !== "idle" && (
              <button type="button" onClick={narration.stop}>
                Stop audio
              </button>
            )}
          </div>
        )}
        <article aria-labelledby="reader-title">
          <blockquote className="reader-scripture">
            <button
              type="button"
              onClick={() => onBible(devotional.scriptureRef)}
              className="reader-scripture-reference"
            >
              <BookOpen size={19} />
              <span>{devotional.scriptureRef}</span>
              <ChevronRight size={16} />
            </button>
            <p>{devotional.scripture}</p>
          </blockquote>
          <div className="reader-body">
            {devotional.body.map((paragraph, index) => (
              <p key={`${devotional.id}-${index}`}>{paragraph}</p>
            ))}
          </div>
          <section className="reader-reflection">
            <h2>Prayer for Today</h2>
            <p>{devotional.prayer}</p>
          </section>
          {devotional.declaration && (
            <section className="reader-reflection">
              <h2>Prophetic Declaration</h2>
              <p>{devotional.declaration}</p>
            </section>
          )}
          {devotional.furtherStudy && (
            <section className="reader-study">
              <h2>Further Study</h2>
              <button
                type="button"
                onClick={() => onBible(devotional.furtherStudy)}
              >
                {devotional.furtherStudy}
                <ChevronRight size={18} />
              </button>
            </section>
          )}
          {devotional.audience === "Adults" && (
            <section className="reader-year">
              <h2>Bible in a Year</h2>
              <div className="reader-year-links">
                <button type="button" onClick={() => onBible("Genesis 1")}>
                  <span>
                    Old Testament<strong>Genesis 1–3</strong>
                  </span>
                  <ChevronRight size={18} />
                </button>
                <button type="button" onClick={() => onBible("Matthew 1:1-17")}>
                  <span>
                    New Testament<strong>Matthew 1:1–17</strong>
                  </span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </section>
          )}
        </article>
        <button
          type="button"
          className={`reader-complete primary-button${completed ? " is-complete" : ""}`}
          onClick={onComplete}
          disabled={completed}
        >
          {completed ? <CheckCheck size={21} /> : <Check size={21} />}
          {completed ? "Reading completed" : "Mark as complete"}
        </button>
        {completed && (
          <p className="reader-complete-note" role="status">
            A little GoodNews, every day.
          </p>
        )}
        <button type="button" className="reader-return" onClick={onBack}>
          <ArrowLeft size={17} />
          Back to GoodNews
        </button>
      </div>
      <ReadingShareDialog
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        title={devotional.title}
        text={shareText}
      />
    </div>
  );
}

export default Reader;
