---
name: test-plan-creator
description: Create comprehensive, structured software test plans based on requirements, user stories, or technical specifications. Use when the user asks to write a test plan, QA strategy, testing scope, or test schedule.
---

# Test Plan Creator
Your task is to create a test plan based on the knowledge shared by the user. Make sure to use proper templates that was mentioned below.

## Summary
Guide the creation of thorough, professional, and well-structured software test plans following IEEE 829 standards or modern agile QA best practices.

## When to Use
- The user requests a test plan for a software feature, system, app, or release.
- The user provides requirements, user stories, PRDs (Product Requirements Documents), or technical specs and needs a QA testing strategy.

## Test Plan Structure & Guidelines
When generating a test plan, ensure it includes the following standardized sections:

1. **Test Plan Identifier & Metadata**
   - Plan Name, Version, Author, Date, Target Release / Version.
2. **Introduction & Objectives**
   - High-level overview of the feature/system under test (FUT/SUT).
   - Goals of the testing effort (quality gates, risk mitigation).
3. **Scope of Testing**
   - **In-Scope:** Features, modules, platforms, devices, environments.
   - **Out-of-Scope:** Excluded functionalities or deferred items with justification.
4. **Types of Testing**
   - Functional, Integration, Regression, Performance/Load, Security, Usability, Accessibility (WCAG), API/Integration testing.
5. **Approach / Methodology**
   - Testing techniques (Black-box, White-box, Boundary Value Analysis, Equivalence Partitioning).
   - Automation vs. Manual split.
6. **Test Environment & Tools**
   - Staging/Test environments, browsers, devices, OS versions.
   - Testing tools (e.g., Selenium, Playwright, Jest, Postman, Jira, TestRail).
7. **Test Deliverables**
   - Test cases, test data, traceability matrix (RTM), execution reports, bug reports.
8. **Schedule & Milestones**
   - Timeline phases: Test planning, test case writing, execution cycles, bug fixing, sign-off.
9. **Roles & Responsibilities**
   - QA Engineers, Developers, Product Owners, Stakeholders.
10. **Risk Management & Mitigation**
    - Identified risks (e.g., environment instability, scope creep, delayed builds) and mitigation plans.
11. **Pass/Fail Criteria & Exit Criteria**
    - Criteria for starting test execution (Entry Criteria).
    - Criteria for stopping test execution and signing off (Exit Criteria, e.g., 95% pass rate, zero blocker/critical bugs).

## Workflow
1. **Analyze Requirements:** Review the provided requirements, user stories, or specs to extract testable components, acceptance criteria, and edge cases.
2. **Determine Scope & Approach:** Define what is tested, what type of testing applies, and tools required.
3. **Draft the Test Plan:** Structure the plan clearly using Markdown tables and bullet points for readability.
4. **Identify Risks & Criteria:** Clearly specify entry/exit criteria and risk mitigation.