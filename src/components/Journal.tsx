import { ArrowLeft, Plus, Search, Trash2, BookOpen } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Modal } from "./Modal";
export interface Note {
  id: string;
  title: string;
  body: string;
  date: string;
}
export default function Journal({
  notes,
  onChange,
  onBack,
}: {
  notes: Note[];
  onChange: (notes: Note[]) => void;
  onBack: () => void;
}) {
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Note | null>(null);
  const [confirm, setConfirm] = useState(false);
  const [discard, setDiscard] = useState(false);
  const pendingNavigation = useRef<(() => void) | null>(null);
  const original = editing
    ? notes.find((note) => note.id === editing.id)
    : undefined;
  const dirty =
    !!editing &&
    (editing.title !== (original?.title ?? "") ||
      editing.body !== (original?.body ?? ""));
  useEffect(() => {
    if (!dirty) return;
    const beforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    const beforeNavigate = (event: Event) => {
      event.preventDefault();
      pendingNavigation.current = (
        event as CustomEvent<{ proceed: () => void }>
      ).detail.proceed;
      setDiscard(true);
    };
    window.addEventListener("beforeunload", beforeUnload);
    window.addEventListener("gnd-before-navigate", beforeNavigate);
    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
      window.removeEventListener("gnd-before-navigate", beforeNavigate);
    };
  }, [dirty]);
  function closeEditor() {
    setEditing(null);
    setConfirm(false);
    setDiscard(false);
    pendingNavigation.current = null;
  }
  function save() {
    if (!editing || (!editing.title.trim() && !editing.body.trim())) return;
    const next = {
      ...editing,
      title: editing.title.trim() || "Untitled reflection",
      date: new Date().toISOString(),
    };
    onChange([next, ...notes.filter((n) => n.id !== next.id)]);
    closeEditor();
  }
  return (
    <section className="narrow-screen journal-screen">
      <header className="page-header">
        <button
          className="icon-button"
          aria-label="Back to profile"
          onClick={onBack}
        >
          <ArrowLeft />
        </button>
        <h1 className="page-heading">My journal</h1>
        <button
          className="icon-button"
          aria-label="New note"
          onClick={() =>
            setEditing({
              id: crypto.randomUUID(),
              title: "",
              body: "",
              date: new Date().toISOString(),
            })
          }
        >
          <Plus />
        </button>
      </header>
      <p className="muted">A quiet space for your notes & reflections.</p>
      <label className="search-field">
        <Search size={19} />
        <input
          aria-label="Search notes"
          placeholder="Search your journal…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      {notes
        .filter((n) =>
          (n.title + " " + n.body).toLowerCase().includes(query.toLowerCase()),
        )
        .map((note) => (
          <button
            key={note.id}
            className="note-card surface"
            onClick={() => setEditing(note)}
          >
            <span>
              {new Date(note.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <h2>{note.title}</h2>
            <p>{note.body}</p>
          </button>
        ))}
      {!notes.length && (
        <div className="empty-state surface">
          <BookOpen size={36} />
          <h2>Your next chapter starts here</h2>
          <p>Capture a scripture, a prayer, or something on your heart.</p>
          <button
            className="primary-button"
            onClick={() =>
              setEditing({
                id: crypto.randomUUID(),
                title: "",
                body: "",
                date: new Date().toISOString(),
              })
            }
          >
            Write your first note
          </button>
        </div>
      )}
      {notes.length > 0 &&
        !notes.some((n) =>
          (n.title + " " + n.body).toLowerCase().includes(query.toLowerCase()),
        ) && <p className="empty-state">No notes match “{query}”.</p>}
      {editing && (
        <Modal
          title="Your reflection"
          onBeforeClose={() => {
            if (!dirty) return true;
            setDiscard(true);
            return false;
          }}
          onClose={closeEditor}
        >
          <label className="field-label">
            Title
            <input
              value={editing.title}
              placeholder="Give your reflection a title"
              maxLength={150}
              onChange={(e) =>
                setEditing({ ...editing, title: e.target.value })
              }
            />
          </label>
          <label className="field-label">
            Notes
            <textarea
              rows={9}
              value={editing.body}
              placeholder="What is on your heart today?"
              onChange={(e) => setEditing({ ...editing, body: e.target.value })}
            />
          </label>
          <div className="modal-actions">
            {notes.some((n) => n.id === editing.id) && (
              <button
                className="glass-button danger-text"
                onClick={() => setConfirm(true)}
              >
                <Trash2 size={17} /> Delete
              </button>
            )}
            <button
              className="primary-button"
              disabled={!editing.title.trim() && !editing.body.trim()}
              onClick={save}
            >
              Save note
            </button>
          </div>
          {discard && (
            <div className="data-confirm" role="alert">
              <strong>Keep your unfinished reflection?</strong>
              <p>Your changes have not been saved.</p>
              <div className="modal-actions">
                <button
                  className="glass-button"
                  onClick={() => {
                    setDiscard(false);
                    pendingNavigation.current = null;
                  }}
                >
                  Keep editing
                </button>
                <button
                  className="glass-button danger-text"
                  onClick={() => {
                    const proceed = pendingNavigation.current;
                    closeEditor();
                    proceed?.();
                  }}
                >
                  Discard changes
                </button>
              </div>
            </div>
          )}
          {confirm && (
            <div className="delete-confirm">
              <p>Delete this note from your journal?</p>
              <button
                className="glass-button"
                onClick={() => setConfirm(false)}
              >
                Keep note
              </button>
              <button
                className="glass-button danger-text"
                onClick={() => {
                  onChange(notes.filter((n) => n.id !== editing.id));
                  closeEditor();
                }}
              >
                Delete note
              </button>
            </div>
          )}
        </Modal>
      )}
    </section>
  );
}
