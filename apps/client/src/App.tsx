import React, { useState, useEffect } from 'react';
import type { SystemHealth } from '@talent-sync/shared';

export default function App(): React.JSX.Element {
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setHealth(data.data);
        }
      })
      .catch((err) => console.error('Failed to connect to API:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="simple-page-container">
      <div className="simple-card">
        <div className="brand-badge">TalentSync</div>
        <h1 className="simple-title">TalentSync</h1>
        <p className="simple-description">
          A simple, modern workspace for talent synchronization and candidate intelligence.
        </p>

        <div className="status-box">
          <div className="status-header">
            <span
              className="status-dot"
              style={{ backgroundColor: health ? '#10b981' : '#f59e0b' }}
            />
            <span className="status-text">
              {loading
                ? 'Connecting to backend API...'
                : health
                  ? `API Connected (${health.service})`
                  : 'Backend Offline'}
            </span>
          </div>

          {health && (
            <div className="status-meta">
              <span>Environment: <strong>{health.environment}</strong></span>
              <span>Status: <strong style={{ color: '#10b981' }}>{health.status.toUpperCase()}</strong></span>
              <span>Uptime: <strong>{health.uptimeSeconds}s</strong></span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
