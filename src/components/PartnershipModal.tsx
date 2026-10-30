import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Modal } from "./Modal";
export function PartnershipModal({ onClose }: { onClose: () => void }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [loadForm, setLoadForm] = useState(false);
  const [slow, setSlow] = useState(false);
  useEffect(() => {
    if (!loadForm) return;
    const timer = window.setTimeout(() => setSlow(true), 12000);
    return () => window.clearTimeout(timer);
  }, [loadForm]);
  useEffect(() => {
    const close = (event: MessageEvent) => {
      if (
        event.origin === window.location.origin &&
        event.source === frame.current?.contentWindow &&
        event.data === "gnd-partnership-close"
      )
        onClose();
    };
    window.addEventListener("message", close);
    return () => window.removeEventListener("message", close);
  }, [onClose]);
  return (
    <Modal
      title="Support the free app"
      onClose={onClose}
      className="partnership-modal"
    >
      <div className="information-copy partnership-intro">
        <p>
          Partner with us to support development of the GoodNews Daily app and
          the technology that keeps it free.
        </p>
        <p>
          We are not a charity. Partnership is voluntary, and nothing is
          unlocked: no exclusive content, membership, badges or app features.
          Purchases from the official store also support this work.
        </p>
        <p className="muted">
          The form is hosted at sub.goodnewsdailydevotional.com. Loading it
          connects to that service; information you submit is handled there.
        </p>
      </div>
      {!loadForm ? (
        <button
          className="primary-button full-width"
          onClick={() => setLoadForm(true)}
        >
          Load partnership form
        </button>
      ) : (
        <>
          <p role="status" className="small muted">
            {slow
              ? "If the form has not appeared, use the link below to open it directly."
              : "Loading the hosted form below. You can also open it in a new tab."}
          </p>
          <iframe
            ref={frame}
            src="/partnership.html"
            title="GoodNews partnership form"
            className="partnership-frame"
          />
        </>
      )}
      <a
        className="partnership-fallback"
        href="https://sub.goodnewsdailydevotional.com/widget/form/PykLGzAFXjz2UYO5pSac"
        target="_blank"
        rel="noreferrer"
      >
        Open form in a new tab <ArrowUpRight size={14} />
      </a>
    </Modal>
  );
}
