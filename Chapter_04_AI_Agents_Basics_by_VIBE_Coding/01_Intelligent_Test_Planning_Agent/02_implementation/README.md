# Jira Test Plan Generator

Lightweight React + Express app that accepts a Jira issue ID, retrieves its requirements, and generates a test plan using the supplied template.

## Run
```bash
npm --prefix src/backend install
npm --prefix src/frontend install
npm --prefix src/frontend run build
npm start
```
Open http://localhost:4000

## Config
The backend reads `../../.env` (parent folder) for `JIRA_BASE_URL`, `JIRA_EMAIL`, `JIRA_TOKEN`, and `GROQ_API_KEY`.
