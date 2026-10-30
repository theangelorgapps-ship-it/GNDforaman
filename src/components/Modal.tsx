import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { X } from "lucide-react";
export function Modal({
  title,
  onClose,
  children,
  className = "",
  onBeforeClose,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  onBeforeClose?: () => boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [closing, setClosing] = useState(false);
  const opener = useRef(document.activeElement as HTMLElement | null);
  function close() {
    if (closing) return;
    if (onBeforeClose && !onBeforeClose()) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onClose();
      return;
    }
    setClosing(true);
    timer.current = setTimeout(onClose, 160);
  }
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  useEffect(() => {
    const prior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.focus();
    return () => {
      document.body.style.overflow = prior;
      const previous = opener.current;
      if (previous?.isConnected && previous !== document.body) previous.focus();
      else
        document
          .querySelector<HTMLElement>('[aria-current="page"],#main-content')
          ?.focus();
    };
  }, []);
  return (
    <div
      className={`modal-backdrop ${closing ? "is-closing" : ""}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={`modal-panel ${className}`}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.stopPropagation();
            close();
          }
          if (e.key === "Tab") {
            const nodes = Array.from(
              ref.current?.querySelectorAll<HTMLElement>(
                'button:not(:disabled),a[href],input:not(:disabled),textarea:not(:disabled),select:not(:disabled),iframe,[tabindex="0"]',
              ) ?? [],
            ).filter(
              (node) =>
                node.getClientRects().length > 0 &&
                node.getAttribute("aria-hidden") !== "true",
            );
            const first = nodes[0],
              last = nodes[nodes.length - 1];
            if (
              e.shiftKey &&
              (document.activeElement === first ||
                document.activeElement === ref.current)
            ) {
              e.preventDefault();
              last?.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
              e.preventDefault();
              first?.focus();
            }
          }
        }}
      >
        <header className="modal-header">
          <h2>{title}</h2>
          <button
            className="icon-button"
            aria-label={`Close ${title}`}
            onClick={close}
          >
            <X size={22} />
          </button>
        </header>
        {children}
      </div>
    </div>
  );
}
