import { useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  ChevronRight,
  Flame,
  Heart,
  Palette,
  Settings,
  Shield,
  UserPen,
  X,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import "./profile.css";
type Props = {
  name: string;
  streak: number;
  readings: number;
  saved: number;
  notes: number;
  onBack: () => void;
  onSettings: (kind: string) => void;
  onNotes: () => void;
  onSaved: () => void;
};
export default function Profile({
  name,
  streak,
  readings,
  saved,
  notes,
  onBack,
  onSettings,
  onNotes,
  onSaved,
}: Props) {
  const [trayOpen, setTrayOpen] = useState(true);
  return (
    <section className="profile-screen narrow-screen">
      <div className="profile-auth">
        <button className="glass-button" onClick={() => onSettings("account")}>
          Log in
        </button>
        <button className="glass-button" onClick={() => onSettings("account")}>
          Sign up
        </button>
      </div>
      <div className="profile-card">
        <div className="profile-intro">
          Your GoodNews story <Sparkles size={43} />
        </div>
        <div className="profile-top-actions">
          <button
            aria-label="Profile settings"
            className="icon-button"
            onClick={() => onSettings("settings")}
          >
            <Settings size={20} />
          </button>
          <button
            aria-label="Close profile"
            className="icon-button"
            onClick={onBack}
          >
            <X size={20} />
          </button>
        </div>
        <div className="profile-counts">
          <div>
            <strong>{readings}</strong>
            <span>readings</span>
          </div>
          <img src="/assets/profile.png" alt="Profile silhouette" />
          <div>
            <strong>
              <Flame size={21} />
              {streak}
            </strong>
            <span>days streak</span>
          </div>
        </div>
        <h1>{name || "Reader"}</h1>
        <p className="profile-private">Private local journey</p>
        <button className="outreach-card" onClick={() => onSettings("journey")}>
          <span>Keep the GoodNews moving</span>
          <strong>
            Your outreach
            <br />
            journey
          </strong>
          <small>Connections, milestones & impact</small>
          <Sparkles className="outreach-sparkles" size={44} />
          <ArrowUpRight size={26} />
        </button>
        <div className="profile-stats">
          <button
            className="journal-stat"
            aria-label={`Open journal, ${notes} notes`}
            onClick={onNotes}
          >
            <b>My journal</b>
            <strong>{notes}</strong>
            <span>notes & reflections</span>
          </button>
          <button
            className="saved-stat"
            aria-label={`Open saved readings, ${saved} saved`}
            onClick={onSaved}
          >
            <b>Saved readings</b>
            <strong>{saved}</strong>
            <span>ready to revisit</span>
          </button>
        </div>
        <div className="profile-next">
          <BookOpen size={16} /> Your next chapter starts today.
        </div>
        <button
          className="profile-partnership"
          onClick={() => onSettings("partner")}
        >
          <Heart />
          <span>
            <b>GoodNews partnership</b>
            <small>Help share the GoodNews</small>
          </span>
          <ChevronRight size={19} />
        </button>
        <div className="profile-setting-list">
          {[
            {
              key: "appearance",
              label: "Appearance",
              detail: "Make this space yours",
              Icon: Palette,
            },
            {
              key: "settings",
              label: "Settings",
              detail: "Your reading preferences",
              Icon: Settings,
            },
            {
              key: "privacy",
              label: "Privacy & security",
              detail: "Your account and personal data",
              Icon: Shield,
            },
          ].map(({ key, label, detail, Icon }) => (
            <button key={key} onClick={() => onSettings(key)}>
              <Icon size={21} />
              <span>
                <b>{label}</b>
                <small>{detail}</small>
              </span>
              <ChevronRight size={18} />
            </button>
          ))}
        </div>
        <button className="edit-name" onClick={() => onSettings("name")}>
          <UserPen size={16} /> Edit reader name
        </button>
      </div>
      <aside
        className={`profile-tray ${trayOpen ? "" : "collapsed"}`}
        aria-label="Profile shortcuts"
      >
        <div className="profile-tray-top">
          <span>Profile</span>
          <button
            className="icon-button"
            aria-label={
              trayOpen ? "Collapse profile menu" : "Expand profile menu"
            }
            aria-expanded={trayOpen}
            onClick={() => setTrayOpen(!trayOpen)}
          >
            <ChevronDown size={19} />
          </button>
        </div>
        {trayOpen && (
          <div className="profile-shortcut-items">
            {[
              {
                label: "Profile",
                icon: "object-profile-neutral",
                action: "name",
              },
              {
                label: "Appearance",
                icon: "object-appearance",
                action: "appearance",
              },
              { label: "Privacy", icon: "object-privacy", action: "privacy" },
              {
                label: "Settings",
                icon: "object-settings",
                action: "settings",
              },
              { label: "Prayer", icon: "object-prayer-hands", action: "alarm" },
              {
                label: "Community",
                icon: "object-testimonies",
                action: "community",
              },
              {
                label: "Store",
                icon: "object-daily-magazine",
                action: "store",
              },
            ].map((item) => (
              <button key={item.label} onClick={() => onSettings(item.action)}>
                <img src={"/assets/" + item.icon + ".png"} alt="" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </aside>
    </section>
  );
}
