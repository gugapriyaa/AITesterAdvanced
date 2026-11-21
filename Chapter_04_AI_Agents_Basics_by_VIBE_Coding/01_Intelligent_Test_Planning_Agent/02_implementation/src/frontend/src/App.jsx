import React, { useState } from 'react';

export default function App() {
  const [issueId, setIssueId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [plan, setPlan] = useState('');
  const [settings, setSettings] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  async function generate() {
    if (!issueId.trim() || loading) return;
    setLoading(true);
    setError('');
    setPlan('');
    try {
      const res = await fetch('/api/testplan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ issueId: issueId.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Request failed.');
      } else {
        setPlan(data.plan);
      }
    } catch (e) {
      setError('Network error. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }

  async function openSettings() {
    setShowSettings(!showSettings);
    if (!settings) {
      const res = await fetch('/api/settings');
      setSettings(await res.json());
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1>Jira Test Plan Generator</h1>
      <p>Enter a Jira issue ID to retrieve its requirements and generate a test plan.</p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          value={issueId}
          onChange={(e) => setIssueId(e.target.value)}
          placeholder="e.g. QA-123"
          style={{ flex: 1, padding: 8, fontSize: 16 }}
        />
        <button onClick={generate} disabled={loading || !issueId.trim()} style={{ padding: '8px 16px' }}>
          {loading ? 'Generating...' : 'Generate Test Plan'}
        </button>
        <button onClick={openSettings} style={{ padding: '8px 16px' }}>
          Settings
        </button>
      </div>

      {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}

      {showSettings && settings && (
        <div style={{ background: '#f5f5f5', padding: 16, marginBottom: 16 }}>
          <h3>Settings</h3>
          <p><strong>Jira Base URL:</strong> {settings.jiraBaseUrl}</p>
          <p><strong>Jira Email:</strong> {settings.jiraEmail}</p>
          <p><strong>Jira Token:</strong> {settings.jiraToken}</p>
          <p><strong>Groq API Key:</strong> {settings.groqApiKey}</p>
        </div>
      )}

      {plan && (
        <pre style={{ whiteSpace: 'pre-wrap', background: '#fafafa', border: '1px solid #ddd', padding: 16, borderRadius: 6 }}>
          {plan}
        </pre>
      )}
    </div>
  );
}
