import { lazy, useEffect, useRef, useState } from "react";
import {
  Book,
  BookOpen,
  Check,
  ChevronRight,
  Compass,
  Copy,
  Download,
  Home as HomeIcon,
  Link,
  Moon,
  Monitor,
  Share2,
  Store,
  Sun,
  User,
  Volume2,
  X,
} from "lucide-react";
import Home from "./components/Home";
import Reader from "./components/Reader";
import { Library } from "./components/Library";
import { Collections } from "./components/Collections";
import { Bible } from "./components/Bible";
import Profile from "./components/Profile";
import Journal from "./components/Journal";
import type { Note } from "./components/Journal";
import { Modal } from "./components/Modal";
const StorePage = lazy(() =>
  import("./components/Store").then((m) => ({ default: m.StorePage })),
);
const ProductPage = lazy(() =>
  import("./components/Store").then((m) => ({ default: m.ProductPage })),
);
const ShoppingBag = lazy(() =>
  import("./components/Store").then((m) => ({ default: m.ShoppingBag })),
);
import { PartnershipModal } from "./components/PartnershipModal";
import { PRODUCTS, type Product } from "./catalog";
function currentRoute(): { screen: Screen; product: Product | null } {
  const route = window.location.hash.slice(2);
  if (route.startsWith("product/")) {
    const product = PRODUCTS.find((p) => p.slug === route.slice(8));
    return { screen: product ? "product" : "store", product: product ?? null };
  }
  const screens: Screen[] = [
    "home",
    "library",
    "collections",
    "bible",
    "profile",
    "notes",
    "store",
  ];
  return {
    screen: screens.includes(route as Screen) ? (route as Screen) : "home",
    product: null,
  };
}
import { useLocalState, copyText } from "./hooks";
import { useAppearance } from "./use-appearance";
import { todayFor } from "./data";
import type { Audience, Devotional, Screen } from "./types";
interface Alarm {
  enabled: boolean;
  interval: number;
  start: string;
  end: string;
  days: number[];
  label: string;
}
const initialAlarm: Alarm = {
  enabled: false,
  interval: 30,
  start: "07:00",
  end: "20:00",
  days: [0, 1, 2, 3, 4, 5, 6],
  label: "Prayer time",
};
export default function App() {
  const [screen, setScreen] = useState<Screen>(() => currentRoute().screen);
  const [product, setProduct] = useState<Product | null>(
    () => currentRoute().product,
  );
  const [audience, setAudience] = useLocalState<Audience>("audience", "Adults");
  const { appearance, setAppearance, dark, toggleTheme } = useAppearance();
  const [saved, setSaved] = useLocalState<string[]>("saved", []);
  const [completed, setCompleted] = useLocalState<string[]>("completed", []);
  const [readingDays, setReadingDays] = useLocalState<string[]>(
    "reading-days",
    [],
  );
  const [name, setName] = useLocalState<string>("name", "Reader");
  const [notes, setNotes] = useLocalState<Note[]>("notes", []);
  const [alarm, setAlarm] = useLocalState<Alarm>("alarm", initialAlarm);
  const [reading, setReading] = useState<Devotional>(todayFor(audience));
  const [returnScreen, setReturnScreen] = useState<Screen>("home");
  const [libraryTab, setLibraryTab] = useState("All");
  const [bibleRef, setBibleRef] = useState<string | undefined>();
  const [modal, setModal] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const [draftName, setDraftName] = useState(name);
  const [draftAlarm, setDraftAlarm] = useState(alarm);
  const [systemNotice, setSystemNotice] = useState("");
  const notified = useRef("");
  useEffect(() => {
    const restore = () => {
      const route = currentRoute();
      setScreen(route.screen);
      setProduct(route.product);
      setModal(null);
    };
    window.addEventListener("popstate", restore);
    window.addEventListener("hashchange", restore);
    return () => {
      window.removeEventListener("popstate", restore);
      window.removeEventListener("hashchange", restore);
    };
  }, []);
  useEffect(() => {
    document.body.dataset.theme = dark ? "dark" : "light";
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", dark ? "#0b1424" : "#f5f6fa");
  }, [dark]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title =
      screen === "home"
        ? "GoodNews Daily Connect"
        : `${screen === "reader" ? reading.title : screen === "product" && product ? product.name : screen[0].toUpperCase() + screen.slice(1)} · GoodNews Daily`;
  }, [screen, reading.title, product]);
  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(""), 4000);
    return () => window.clearTimeout(t);
  }, [toast]);
  useEffect(() => {
    if (!alarm.enabled) return;
    const timer = window.setInterval(() => {
      const now = new Date();
      if (!alarm.days.includes(now.getDay())) return;
      const minute = now.getHours() * 60 + now.getMinutes();
      const toMinute = (v: string) => {
        const [h, m] = v.split(":").map(Number);
        return h * 60 + m;
      };
      const start = toMinute(alarm.start),
        end = toMinute(alarm.end);
      const id = now.toDateString() + "-" + minute;
      if (
        minute >= start &&
        minute <= end &&
        (minute - start) % alarm.interval === 0 &&
        id !== notified.current
      ) {
        notified.current = id;
        setToast(
          alarm.label + ": Remember to lift your family in prayer today.",
        );
      }
    }, 15000);
    return () => window.clearInterval(timer);
  }, [alarm]);
  function navigate(next: Screen) {
    setModal(null);
    setScreen(next);
    window.history.pushState(null, "", `#/${next}`);
    if (next === "library") setLibraryTab("All");
  }
  function openProduct(next: Product) {
    setProduct(next);
    setScreen("product");
    setModal(null);
    window.history.pushState(null, "", `#/product/${next.slug}`);
  }
  function read(d?: Devotional) {
    setReturnScreen(screen === "reader" ? "home" : screen);
    setReading(d ?? todayFor(audience));
    setScreen("reader");
  }
  function toggleSave(id: string) {
    setSaved((old) =>
      old.includes(id) ? old.filter((x) => x !== id) : [...old, id],
    );
  }
  function openModal(kind: string) {
    if (kind === "store") {
      navigate("store");
      return;
    }
    setSystemNotice("");
    if (kind === "name") setDraftName(name);
    if (kind === "alarm") setDraftAlarm(alarm);
    setModal(kind);
  }
  function openLibrary(tab = "All") {
    setLibraryTab(tab);
    setScreen("library");
    setModal(null);
  }
  function openBible(ref?: string) {
    setBibleRef(ref);
    setScreen("bible");
    setModal(null);
  }
  async function copyLink() {
    try {
      await copyText("https://goodnews-daily-connect.expo.app/");
      setToast("GoodNews link copied");
    } catch {
      setSystemNotice(
        "Select and copy this link: https://goodnews-daily-connect.expo.app/",
      );
    }
  }
  const dayKey = (date: Date) =>
    [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");
  let streak = 0;
  const streakDate = new Date();
  if (!readingDays.includes(dayKey(streakDate)))
    streakDate.setDate(streakDate.getDate() - 1);
  while (readingDays.includes(dayKey(streakDate))) {
    streak++;
    streakDate.setDate(streakDate.getDate() - 1);
  }
  const primaryNav = [
    { id: "home", label: "Home", Icon: HomeIcon },
    { id: "library", label: "Library", Icon: Compass },
    { id: "collections", label: "Collection", Icon: BookOpen },
    { id: "bible", label: "Bible", Icon: Book },
    { id: "store", label: "Store", Icon: Store },
    { id: "profile", label: "Profile", Icon: User },
  ] as const;
  return (
    <>
      <main id="main-content" key={screen} className="page-transition">
        {screen === "home" && (
          <Home
            audience={audience}
            onAudience={setAudience}
            onRead={read}
            onSearch={() => openLibrary("Search")}
            onProfile={() => navigate("profile")}
            onTheme={toggleTheme}
            dark={dark}
            onPartner={() => openModal("partner")}
            onAlarm={() => openModal("alarm")}
            onStories={() => openLibrary("Blogs")}
            onStore={() => navigate("store")}
            onProduct={openProduct}
            completed={completed.includes(todayFor(audience).id)}
          />
        )}
        {screen === "reader" && (
          <Reader
            devotional={reading}
            onBack={() => setScreen(returnScreen)}
            saved={saved.includes(reading.id)}
            onSave={() => toggleSave(reading.id)}
            completed={completed.includes(reading.id)}
            onComplete={() => {
              const day = dayKey(new Date());
              setReadingDays((old) =>
                old.includes(day) ? old : [...old, day],
              );
              setCompleted((old) =>
                old.includes(reading.id) ? old : [...old, reading.id],
              );
              setToast("Reading completed. Your journey is growing.");
            }}
            onBible={openBible}
          />
        )}
        {screen === "library" && (
          <Library
            key={libraryTab}
            onRead={read}
            saved={saved}
            onSave={toggleSave}
            onTheme={toggleTheme}
            dark={dark}
            onProfile={() => navigate("profile")}
            initialTab={libraryTab}
            onNotes={() => navigate("notes")}
            onBible={() => openBible()}
            onAlarm={() => openModal("alarm")}
          />
        )}
        {screen === "collections" && (
          <Collections
            audience={audience}
            onAudience={setAudience}
            onRead={read}
            onBack={() => navigate("home")}
            onTheme={toggleTheme}
            dark={dark}
          />
        )}
        {screen === "bible" && <Bible initialReference={bibleRef} />}
        {screen === "profile" && (
          <Profile
            name={name}
            streak={streak}
            readings={completed.length}
            saved={saved.length}
            notes={notes.length}
            onBack={() => navigate("home")}
            onSettings={openModal}
            onNotes={() => navigate("notes")}
            onSaved={() => openLibrary("Saved")}
          />
        )}
        {screen === "notes" && (
          <Journal
            notes={notes}
            onChange={setNotes}
            onBack={() => navigate("profile")}
          />
        )}
        {screen === "store" && (
          <StorePage
            onProduct={openProduct}
            onBag={() => openModal("bag")}
            onBack={() => navigate("home")}
            dark={dark}
            onTheme={toggleTheme}
          />
        )}
        {screen === "product" && product && (
          <ProductPage
            product={product}
            onBack={() => navigate("store")}
            onBag={() => openModal("bag")}
          />
        )}
      </main>
      {screen !== "reader" && screen !== "product" && (
        <div className="dock-wrap">
          <nav aria-label="Bottom Navigation" className="bottom-dock">
            {primaryNav.map(({ id, label, Icon }) => {
              const active = screen === id;
              return (
                <button
                  className={`dock-item ${active ? "active" : ""}`}
                  key={id}
                  aria-label={`Open ${label}`}
                  aria-current={screen === id ? "page" : undefined}
                  onClick={() => navigate(id)}
                >
                  <Icon size={25} strokeWidth={active ? 1.9 : 1.6} />
                  <span>{label}</span>
                </button>
              );
            })}
          </nav>
          <button
            className="share-orb"
            aria-label="Open Tap2Connect"
            onClick={() => openModal("tap")}
          >
            <Share2 size={26} strokeWidth={1.7} />
          </button>
        </div>
      )}
      {modal === "name" && (
        <Modal title="Make it yours" onClose={() => setModal(null)}>
          <img className="modal-object" src="/assets/profile.png" alt="" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setName(draftName.trim() || "Reader");
              setModal(null);
              setToast("Reader name updated");
            }}
          >
            <label className="field-label">
              Your name
              <input
                autoFocus
                maxLength={60}
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                placeholder="Reader"
              />
            </label>
            <p className="muted small">Your name is saved on this device.</p>
            <button className="primary-button full-width" type="submit">
              Save name
            </button>
          </form>
        </Modal>
      )}
      {modal === "appearance" && (
        <Modal title="Appearance" onClose={() => setModal(null)}>
          <p className="muted">Make this space yours.</p>
          <div className="appearance-options">
            {[
              {
                value: "light" as const,
                Icon: Sun,
                title: "Light",
                className: "light-preview",
              },
              {
                value: "dark" as const,
                Icon: Moon,
                title: "Dark",
                className: "dark-preview",
              },
              {
                value: "system" as const,
                Icon: Monitor,
                title: "System",
                className: "system-preview",
              },
            ].map(({ value, Icon, title, className }) => (
              <button
                key={title}
                className={`appearance-choice ${appearance === value ? "selected" : ""}`}
                aria-pressed={appearance === value}
                onClick={() => setAppearance(value)}
              >
                <div className={className}>
                  <Icon />
                  <span />
                  <span />
                </div>
                <b>{title}</b>
                {appearance === value && <Check size={16} />}
              </button>
            ))}
          </div>
        </Modal>
      )}
      {modal === "settings" && (
        <Modal title="Settings" onClose={() => setModal(null)}>
          <div className="setting-rows">
            <button onClick={() => openModal("name")}>
              <User size={20} />
              <span>
                Reader name<small>{name}</small>
              </span>
              <ChevronRight size={18} />
            </button>
            <button onClick={() => openModal("appearance")}>
              <Sun size={20} />
              <span>
                Appearance
                <small>
                  {appearance === "system"
                    ? "System appearance"
                    : dark
                      ? "Dark mode"
                      : "Light mode"}
                </small>
              </span>
              <ChevronRight size={18} />
            </button>
            <button onClick={() => openModal("alarm")}>
              <Volume2 size={20} />
              <span>
                Scheduled Prayer Reminders
                <small>
                  {alarm.enabled ? `Every ${alarm.interval} minutes` : "Off"}
                </small>
              </span>
              <ChevronRight size={18} />
            </button>
            <div className="setting-row">
              <BookOpen size={20} />
              <label>
                Preferred devotional
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value as Audience)}
                >
                  <option>Adults</option>
                  <option>Teens</option>
                  <option>Kids</option>
                </select>
              </label>
            </div>
          </div>
        </Modal>
      )}
      {modal === "privacy" && (
        <Modal title="Privacy & security" onClose={() => setModal(null)}>
          <div className="privacy-copy">
            <h3>Your private local journey</h3>
            <p>
              Your reader name, notes, saved readings, highlights, and
              preferences stay in this browser’s local storage.
            </p>
            <p>
              This local replica does not create an online account or sync your
              personal information. External Bible passages are requested only
              when you open a passage that is not bundled.
            </p>
            <button
              className="glass-button"
              onClick={() => {
                const blob = new Blob(
                  [
                    JSON.stringify(
                      { name, notes, saved, completed, readingDays, alarm },
                      null,
                      2,
                    ),
                  ],
                  { type: "application/json" },
                );
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "goodnews-local-journey.json";
                a.click();
                setTimeout(() => URL.revokeObjectURL(url), 1000);
                setToast("Your journey export is ready");
              }}
            >
              <Download size={17} /> Export my journey
            </button>
          </div>
        </Modal>
      )}
      {modal === "account" && (
        <Modal title="Your GoodNews account" onClose={() => setModal(null)}>
          <img className="modal-object" src="/assets/profile.png" alt="" />
          <h3>Your reading journey starts here.</h3>
          <p className="muted">
            This local edition saves your journey on this device. Online sign-in
            is available through the original GoodNews app.
          </p>
          <button
            className="primary-button full-width"
            onClick={() => openModal("name")}
          >
            Continue as a local reader
          </button>
          <a
            className="glass-button full-width"
            href="https://goodnews-daily-connect.expo.app/"
            target="_blank"
            rel="noreferrer"
          >
            Open original app <Link size={15} />
          </a>
        </Modal>
      )}
      {modal === "partner" && (
        <PartnershipModal onClose={() => setModal(null)} />
      )}
      {modal === "bag" && (
        <ShoppingBag onClose={() => setModal(null)} onProduct={openProduct} />
      )}
      {modal === "journey" && (
        <Modal title="Your outreach journey" onClose={() => setModal(null)}>
          <div className="journey-banner">
            <Share2 size={40} />
            <h3>Keep the GoodNews moving.</h3>
            <p>Every conversation can be a new beginning.</p>
          </div>
          <div className="journey-counts">
            <div>
              <strong>{completed.length}</strong>
              <span>Readings completed</span>
            </div>
            <div>
              <strong>{saved.length}</strong>
              <span>Saved readings</span>
            </div>
          </div>
          <p className="muted">Share a devotional with someone today.</p>
          <button
            className="primary-button full-width"
            onClick={() => openModal("tap")}
          >
            Share the GoodNews
          </button>
        </Modal>
      )}
      {modal === "tap" && (
        <Modal title="Tap2Connect" onClose={() => setModal(null)}>
          <div className="tap-art">
            <div className="tap-phone">
              <BookOpen size={38} />
              <b>
                GoodNews
                <br />
                Daily
              </b>
              <small>GoodNewsToYou</small>
            </div>
            <div className="tap-signal">
              <Share2 size={42} />
            </div>
          </div>
          <h3 className="modal-lead">GoodNews is meant to be shared.</h3>
          <p className="muted centered">
            Send a little encouragement. Share the GoodNews Daily with someone
            you love.
          </p>
          <div className="share-link">
            <Link size={18} />
            <span>goodnews-daily-connect.expo.app</span>
          </div>
          <button
            className="primary-button full-width"
            onClick={() => void copyLink()}
          >
            <Copy size={17} /> Copy sharing link
          </button>
          {typeof navigator.share === "function" && (
            <button
              className="glass-button full-width"
              onClick={async () => {
                try {
                  await navigator.share({
                    title: "GoodNews Daily",
                    text: "A little GoodNews for your day.",
                    url: "https://goodnews-daily-connect.expo.app/",
                  });
                } catch (e) {
                  if (!(e instanceof Error && e.name === "AbortError"))
                    setSystemNotice(
                      "Sharing is unavailable. Copy the link instead.",
                    );
                }
              }}
            >
              <Share2 size={17} /> Share with someone
            </button>
          )}
          <p className="small muted centered">
            Use the sharing link in this web edition. NFC phone tapping requires
            the native app.
          </p>
          {systemNotice && <p role="status">{systemNotice}</p>}
        </Modal>
      )}
      {modal === "community" && (
        <Modal title="GoodNews community" onClose={() => setModal(null)}>
          <h3 className="modal-lead">Stories of faith. A world of impact.</h3>
          <p className="muted">
            Explore stories and testimonies from the GoodNews community around
            the world.
          </p>
          <button
            className="primary-button full-width"
            onClick={() => openLibrary("Blogs")}
          >
            Explore stories
          </button>
          <button
            className="glass-button full-width"
            onClick={() => openLibrary("Testimonies")}
          >
            Read testimonies
          </button>
        </Modal>
      )}
      {modal === "alarm" && (
        <Modal
          title="Prayer"
          className="alarm-modal"
          onClose={() => setModal(null)}
        >
          <p className="eyebrow">YOUR DAILY RHYTHM</p>
          <h3 className="alarm-lead">Make room to be still.</h3>
          <div className="alarm-summary">
            Every <strong>{draftAlarm.interval}</strong> min
          </div>
          <label className="toggle-row">
            Alarm enabled
            <input
              type="checkbox"
              role="switch"
              checked={draftAlarm.enabled}
              onChange={(e) =>
                setDraftAlarm({ ...draftAlarm, enabled: e.target.checked })
              }
            />
          </label>
          <p className="field-label">Prayer interval</p>
          <div className="interval-options">
            {[10, 15, 30, 60].map((m) => (
              <button
                key={m}
                aria-pressed={draftAlarm.interval === m}
                className={`glass-button ${draftAlarm.interval === m ? "chosen" : ""}`}
                onClick={() => setDraftAlarm({ ...draftAlarm, interval: m })}
              >
                {m} min
              </button>
            ))}
          </div>
          <div className="alarm-times">
            <label className="field-label">
              Starts at
              <input
                type="time"
                value={draftAlarm.start}
                onChange={(e) =>
                  setDraftAlarm({ ...draftAlarm, start: e.target.value })
                }
              />
            </label>
            <label className="field-label">
              Ends at
              <input
                type="time"
                value={draftAlarm.end}
                onChange={(e) =>
                  setDraftAlarm({ ...draftAlarm, end: e.target.value })
                }
              />
            </label>
          </div>
          <p className="field-label">Repeat</p>
          <div className="weekday-options">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
              <button
                key={day}
                aria-label={`Repeat on ${day}`}
                aria-pressed={draftAlarm.days.includes(i)}
                className={draftAlarm.days.includes(i) ? "chosen" : ""}
                onClick={() =>
                  setDraftAlarm({
                    ...draftAlarm,
                    days: draftAlarm.days.includes(i)
                      ? draftAlarm.days.filter((d) => d !== i)
                      : [...draftAlarm.days, i],
                  })
                }
              >
                {day[0]}
              </button>
            ))}
          </div>
          <label className="field-label">
            Label
            <input
              value={draftAlarm.label}
              onChange={(e) =>
                setDraftAlarm({ ...draftAlarm, label: e.target.value })
              }
            />
          </label>
          <p className="small muted">
            On the web, reminders appear while this app is open. Keep this tab
            open to receive them.
          </p>
          {systemNotice && (
            <p role="alert" className="danger-text">
              {systemNotice}
            </p>
          )}
          <button
            className="primary-button full-width"
            onClick={() => {
              if (
                !draftAlarm.start ||
                !draftAlarm.end ||
                draftAlarm.end <= draftAlarm.start
              ) {
                setSystemNotice("Choose an end time after the start time.");
                return;
              }
              if (draftAlarm.enabled && !draftAlarm.days.length) {
                setSystemNotice("Choose at least one day.");
                return;
              }
              setAlarm({
                ...draftAlarm,
                label: draftAlarm.label.trim() || "Prayer time",
              });
              setModal(null);
              setToast("Prayer reminder saved");
            }}
          >
            Done
          </button>
        </Modal>
      )}
      {toast && (
        <div className="toast" role="status">
          <Check size={17} />
          <span>{toast}</span>
          <button
            aria-label="Dismiss notification"
            onClick={() => setToast("")}
          >
            <X size={16} />
          </button>
        </div>
      )}
    </>
  );
}
