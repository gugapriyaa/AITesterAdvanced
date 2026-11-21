import express from 'express';

const app = express();
app.use(express.json());

const JIRA_BASE = process.env.JIRA_BASE_URL;
const JIRA_EMAIL = process.env.JIRA_EMAIL;
const JIRA_TOKEN = process.env.JIRA_TOKEN;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

function mask(value) {
  if (!value) return 'Not configured';
  if (value.length <= 8) return '****';
  return value.slice(0, 4) + '****' + value.slice(-4);
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/settings', (_req, res) => {
  res.json({
    jiraBaseUrl: JIRA_BASE || 'Not configured',
    jiraEmail: JIRA_EMAIL || 'Not configured',
    jiraToken: mask(JIRA_TOKEN),
    groqApiKey: mask(GROQ_API_KEY),
  });
});

async function fetchJiraIssue(issueId) {
  const url = `${JIRA_BASE.replace(/\/$/, '')}/rest/api/2/issue/${encodeURIComponent(issueId)}`;
  const res = await fetch(url, {
    headers: {
      Authorization: 'Basic ' + Buffer.from(`${JIRA_EMAIL}:${JIRA_TOKEN}`).toString('base64'),
      Accept: 'application/json',
    },
  });
  if (res.status === 401 || res.status === 403) {
    throw new Error('Jira authentication failed. Check the configured credentials.');
  }
  if (res.status === 404) {
    throw new Error('Issue not found. Check the Jira issue ID.');
  }
  if (!res.ok) {
    throw new Error(`Jira request failed with status ${res.status}.`);
  }
  return res.json();
}

function buildTemplate(issueKey, title, data) {
  return `# Test Plan — ${issueKey}: ${title}

> Status: **DRAFT — pending human review.** Not approved until a QA owner signs off.

## 1. Scope & Objectives
- **In scope:** ${data.inScope || 'Insufficient information to determine.'}
- **Out of scope:** ${data.outOfScope || 'Insufficient information to determine.'}
- **Objective:** ${data.objective || 'Insufficient information to determine.'}

## 2. Gaps & Questions for the author
${data.gaps || '- Insufficient information to determine.'}

## 3. Test Scenarios
${data.scenarios || '| ID | Priority | Type | Scenario | Maps to |\n|----|----------|------|----------|---------|\n| TS-1 | P0 | Positive | Insufficient information to determine. | Insufficient information to determine. |'}

## 4. Test Data & Environment
- **Data:** ${data.testData || 'Insufficient information to determine.'}
- **Environment / flags:** ${data.environment || 'Insufficient information to determine.'}
- **Roles / permissions:** ${data.roles || 'Insufficient information to determine.'}

## 5. Risks & Assumptions
- **Assumptions made:** ${data.assumptions || 'Insufficient information to determine.'}
- **Risks:** ${data.risks || 'Insufficient information to determine.'}

## 6. Entry / Exit criteria
- **Entry:** ${data.entry || 'Insufficient information to determine.'}
- **Exit:** ${data.exit || 'Insufficient information to determine.'}

## 7. Resource Allocation
${data.resources || 'Insufficient information to determine.'}

## 8. Timelines, Sprint Details
${data.timeline || 'Insufficient information to determine.'}

---
## HUMAN REVIEW GATE
- **I assumed:** ${data.assumed || 'Nothing beyond the supplied requirements.'}
- **I could not confirm:** ${data.unconfirmed || 'Insufficient information to determine.'}
- **Open questions blocking sign-off:** ${data.blockers || 'Insufficient information to determine.'}
- **Approve, or edit, before I write test cases / automation.**`;
}

async function generateWithGroq(issueKey, title, summary, description, acceptanceCriteria) {
  const prompt = `You are a QA test planner. Generate a concise test plan for Jira issue ${issueKey} "${title}".

Jira summary: ${summary || 'None'}
Description: ${description || 'None'}
Acceptance criteria: ${acceptanceCriteria || 'None'}

Return only JSON with these string fields (no markdown, no commentary): inScope, outOfScope, objective, gaps, scenarios, testData, environment, roles, assumptions, risks, entry, exit, resources, timeline, assumed, unconfirmed, blockers.
Use "Insufficient information to determine." for anything the source does not provide. Do not invent requirements.`;

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'openai/gpt-oss-120b',
      temperature: 0.2,
      response_format: { type: 'json_object' },
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  if (!res.ok) {
    throw new Error(`Groq generation failed with status ${res.status}.`);
  }
  const json = await res.json();
  return JSON.parse(json.choices[0].message.content);
}

app.post('/api/testplan', async (req, res) => {
  const issueId = (req.body.issueId || '').trim();
  if (!issueId) {
    return res.status(400).json({ error: 'Jira issue ID is required.' });
  }
  if (!JIRA_BASE || !JIRA_EMAIL || !JIRA_TOKEN) {
    return res.status(500).json({ error: 'Jira configuration is missing. Check the backend environment file.' });
  }
  if (!GROQ_API_KEY) {
    return res.status(500).json({ error: 'AI provider key is missing. Check the backend environment file.' });
  }

  try {
    const issue = await fetchJiraIssue(issueId);
    const fields = issue.fields || {};
    const description = typeof fields.description === 'string'
      ? fields.description
      : (fields.description?.content?.map(b => b.content?.map(c => c.text).join('')).join('\n') || '');

    const data = await generateWithGroq(
      issue.key || issueId,
      fields.summary || 'Untitled',
      fields.summary || '',
      description,
      fields.customfield_10016 || '',
    );

    const plan = buildTemplate(issue.key || issueId, fields.summary || 'Untitled', data);
    res.json({ issueKey: issue.key || issueId, title: fields.summary || 'Untitled', plan });
  } catch (err) {
    res.status(502).json({ error: err.message || 'Failed to generate the test plan.' });
  }
});

export default app;
