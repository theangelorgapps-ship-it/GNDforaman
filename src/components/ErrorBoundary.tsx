import { Component, type ReactNode } from "react";
export class ErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <main className="recovery-screen narrow-screen" role="alert">
        <h1>This screen couldn’t open</h1>
        <p>
          Your saved data has not been cleared. Reload to try again, or return
          to Home.
        </p>
        <div className="modal-actions">
          <button
            className="primary-button"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
          <button
            className="glass-button"
            onClick={() => {
              window.location.hash = "/home";
              window.location.reload();
            }}
          >
            Go to Home
          </button>
        </div>
      </main>
    );
  }
}
