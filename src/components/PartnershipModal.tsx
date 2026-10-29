import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Modal } from "./Modal";
export function PartnershipModal({ onClose }: { onClose: () => void }) {
  const frame = useRef<HTMLIFrameElement>(null);
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
      title="Partner with the GoodNews"
      onClose={onClose}
      className="partnership-modal"
    >
      <iframe
        ref={frame}
        src="/partnership.html"
        title="GoodNews partnership form"
        className="partnership-frame"
      />
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
