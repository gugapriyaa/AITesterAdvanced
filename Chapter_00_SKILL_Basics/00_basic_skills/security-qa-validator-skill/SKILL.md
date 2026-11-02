---
name: security-qa-validator
description: Generate comprehensive security testing checklists and OWASP Top 10 vulnerability test scenarios for new websites or web applications. Use when the user asks to perform a security audit, validate website security, or check OWASP compliance.
---

# Security QA Validator & OWASP Top 10 Checklist

## Summary
Guide the creation of thorough security testing checklists and vulnerability evaluation plans for new websites and web applications based on the latest OWASP Top 10 framework.

## When to Use
- The user requests a security testing checklist or vulnerability assessment plan for a new website or web application.
- The user wants to audit web endpoints, authentication flows, or input fields against OWASP Top 10 vulnerabilities before deployment.

## OWASP Top 10 Security Checklist Structure
When evaluating a web application, structure the security validation plan around the core OWASP risk categories:

1. **A01: Broken Access Control**
   - Verify horizontal/vertical privilege escalation (e.g., changing IDs in URLs/requests).
   - Test unauthorized direct object references (IDOR) on private endpoints and APIs.
   - Ensure proper CORS headers and restricted resource access.

2. **A02: Cryptographic Failures**
   - Verify HTTPS enforcement (HTTP to HTTPS redirection, HSTS header).
   - Check sensitive data transmission in plaintext (passwords, PII, API keys).
   - Ensure secure cookie flags (`HttpOnly`, `Secure`, `SameSite`).

3. **A03: Injection (SQLi, XSS, Command Injection)**
   - Test all user input fields, query parameters, and headers for XSS (Reflected, Stored, DOM-based).
   - Validate input sanitization and parameterized queries against SQL/NoSQL injection.
   - Test file upload fields for malicious script execution.

4. **A04: Insecure Design**
   - Test business logic flaws (e.g., bypassing payment steps, rate limiting on password resets).
   - Ensure robust credential recovery and account lockout mechanisms.

5. **A05: Security Misconfiguration**
   - Check for default credentials or unneeded enabled features/services.
   - Ensure detailed stack traces and debug errors are disabled in production.
   - Verify essential Security Headers (`Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`).

6. **A06: Vulnerable and Outdated Components**
   - Audit client-side libraries, npm packages, and third-party scripts for known CVEs.

7. **A07: Identification and Authentication Failures**
   - Test brute-force defenses on login and MFA endpoints.
   - Validate password policy enforcement and session timeout handling.
   - Verify session fixation protections (session ID rotation upon login).

8. **A08: Software and Data Integrity Failures**
   - Check integrity of external scripts/CDNs using Subresource Integrity (SRI) hashes.
   - Ensure secure CI/CD build processes and signed deployments.

9. **A09: Security Logging and Monitoring Failures**
   - Verify that critical events (failed logins, privilege changes, high-value actions) are logged.
   - Ensure logs do not leak sensitive information (passwords, tokens, credit card details).

10. **A10: Server-Side Request Forgery (SSRF)**
    - Test URL inputs or webhook configurations to ensure backend services cannot be tricked into hitting internal network endpoints.

## Workflow
1. **Scope the Web Application:** Identify target domain, user roles, API endpoints, authentication mechanisms, and data inputs.
2. **Generate Targeted Test Cases:** Produce structured security test cases categorized by OWASP risk areas with clear steps, vectors, and expected defense responses.
3. **Report & Prioritize:** Output actionable findings ranked by severity (Critical, High, Medium, Low) with remediation recommendations.