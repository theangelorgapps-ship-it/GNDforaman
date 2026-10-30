import { useState } from "react";
import { ArrowUpRight, Download } from "lucide-react";
import { exportLocalData } from "../local-data";
import { Modal } from "./Modal";

export type InformationKind = "privacy" | "help" | "about";
const titles = {
  privacy: "Privacy & data",
  help: "Help & support",
  about: "About GoodNews Daily",
};
export function ReaderInformation({
  kind,
  onClose,
  onReset,
}: {
  kind: InformationKind;
  onClose: () => void;
  onReset: () => void;
}) {
  const [confirmReset, setConfirmReset] = useState(false);
  const [status, setStatus] = useState("");
  function download() {
    try {
      const data = exportLocalData(localStorage);
      const url = URL.createObjectURL(
        new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }),
      );
      const link = document.createElement("a");
      link.href = url;
      link.download = `goodnews-data-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setStatus("Your data export has been prepared. Check your downloads.");
    } catch {
      setStatus(
        "Your stored data could not be exported. Check this browser’s storage and download settings, then try again. Nothing has been cleared.",
      );
    }
  }
  return (
    <Modal title={titles[kind]} onClose={onClose} className="information-modal">
      <div className="information-copy">
        {kind === "privacy" && (
          <>
            <h3>Your reader profile lives in this browser</h3>
            <p>
              No sign-in is needed. Your name, journal, saved readings, reading
              activity, Bible highlights, preferences, saved products and bag
              are stored locally. They do not sync between browsers or devices.
              Anyone with access to this browser profile may be able to read
              them.
            </p>
            <p>
              Clearing browser data, using private browsing or changing devices
              can remove your journey. Keep a copy of anything important.
            </p>
            <h3>When this app connects elsewhere</h3>
            <p>
              Opening the app connects to its host, Cloudflare. Bible chapters
              not bundled with the app are requested from Bible API and may be
              cached here. Device narration uses your browser or operating
              system’s speech service.
            </p>
            <p>
              The partnership form loads from sub.goodnewsdailydevotional.com
              only when you choose to load it. The official shop and linked
              articles, documents and contact pages open external services.
              Those providers receive network requests and any information you
              choose to submit; their policies apply.
            </p>
            <h3>Export your stored data</h3>
            <p>
              The JSON file includes all GoodNews data saved in this browser,
              including notes and cached Bible chapters. Keep it private. It is
              a data record; importing or restoring it is not available in this
              edition. Unsaved changes and session-only changes are not
              included.
            </p>
            <button className="glass-button" onClick={download}>
              <Download size={18} /> Export my data
            </button>
            {status && (
              <p role="status" className="information-status">
                {status}
              </p>
            )}
            <h3>Clear this browser’s GoodNews data</h3>
            <p>
              This removes your local profile, journal, activity, highlights,
              preferences, saved products, bag and cached chapters. It does not
              delete orders or information submitted to external services.
            </p>
            {!confirmReset ? (
              <button
                className="glass-button danger-text"
                onClick={() => setConfirmReset(true)}
              >
                Clear local data…
              </button>
            ) : (
              <div
                className="data-confirm"
                role="group"
                aria-label="Confirm clearing local data"
              >
                <strong>Clear your local journey?</strong>
                <p>
                  This cannot be undone here. Export first if needed, and close
                  other GoodNews tabs before clearing.
                </p>
                <div className="modal-actions">
                  <button
                    className="glass-button"
                    onClick={() => setConfirmReset(false)}
                  >
                    Keep my data
                  </button>
                  <button
                    className="glass-button danger-text"
                    onClick={onReset}
                  >
                    Clear local data
                  </button>
                </div>
              </div>
            )}
            <p>
              For information you submitted through the shop or partnership
              form, contact the relevant operator through the official contact
              page.
            </p>
            <OfficialContact />
          </>
        )}
        {kind === "help" && (
          <>
            <h3>Reading and your journey</h3>
            <p>
              Choose an audience on Home, then Read. Save a reading to find it
              in Library → Saved. Your journal, reading activity and saved items
              are available in Profile.
            </p>
            <h3>Audio, Bible and reminders</h3>
            <p>
              Listen uses your device’s reading voice, when supported. Bible
              search opens references or finds words in the current chapter.
              More chapters, full issues and linked stories need an internet
              connection.
            </p>
            <p>
              Prayer reminders appear inside this page while it is open and
              active. They are not background notifications or an alarm when the
              app is closed.
            </p>
            <h3>Store and partnerships</h3>
            <p>
              Your bag is a local shopping list. Orders, payment, shipping and
              returns are handled by the official store. Partnerships are
              optional support for development of the free app and technology;
              nothing is unlocked by contributing.
            </p>
            <h3>Something not working?</h3>
            <p>
              Note the screen, the action you tried and your device/browser.
              Reload the page if a screen fails to load. For a content concern,
              product question or help request, use the official contact page.
              Avoid sending private journal entries or payment details.
            </p>
            <OfficialContact />
          </>
        )}
        {kind === "about" && (
          <>
            <h3>GoodNews Daily</h3>
            <p>
              Read, reflect and keep your journey in one place. This web edition
              includes devotionals, a Bible reader, a local journal, issue
              collections and the GoodNews Daily Store.
            </p>
            <p>Version 1.0.0 · Web edition</p>
            <h3>Keeping the app free</h3>
            <p>
              We offer voluntary partnerships to support development of the app
              and the technology that keeps it free. We are not a charity.
              Support does not unlock content, badges, membership or app
              features. Purchases from the official store also support this
              work.
            </p>
            <h3>Content and sources</h3>
            <p>
              Devotional and collection sources are linked to the official
              GoodNews Daily website. Bible versions and their source are shown
              in the Bible reader. Available readings and products are a
              published snapshot; dates and final shop availability matter.
            </p>
            <a
              className="glass-button"
              href="https://goodnewsdailydevotional.com/"
              target="_blank"
              rel="noreferrer"
            >
              Official GoodNews Daily website <ArrowUpRight size={16} />
            </a>
            <p>
              Your local reader profile is separate from accounts or purchases
              on external websites.
            </p>
          </>
        )}
      </div>
    </Modal>
  );
}
function OfficialContact() {
  return (
    <a
      className="glass-button"
      href="https://goodnewsdailydevotional.com/contact-us/"
      target="_blank"
      rel="noreferrer"
    >
      Official contact page <ArrowUpRight size={16} />
    </a>
  );
}
