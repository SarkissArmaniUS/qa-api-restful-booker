# Test Plan: restful-booker API

## 1. Objective
Verify that the booking REST API (https://restful-booker.herokuapp.com) correctly creates, reads, updates and deletes bookings, enforces authorization, and handles invalid input gracefully.

## 2. Scope
**In scope:** `/ping`, `/auth`, `/booking` (GET list + filters, GET by id, POST, PUT, PATCH, DELETE).
**Out of scope:** performance/load testing, security penetration testing, UI.

## 3. Test approach
| Level | Tool | Purpose |
|---|---|---|
| Automated API tests | Playwright + TypeScript + Zod | Regression: CRUD, auth, schema, negative cases |
| Automated collection | Postman + Newman | Smoke-level end-to-end flow, runs in CI |
| Manual exploratory | curl / Postman | Finding defects, see `docs/bug-reports/` |

Test design techniques: equivalence partitioning (valid/invalid payloads), boundary/negative inputs (missing fields, non-existent ids), state-transition checks (create -> update -> delete -> get 404), and authorization matrix (no token / invalid token / valid token).

## 4. Test environment
Public demo API, shared with other users and reset periodically. Tests create their own data with unique last names and clean up after themselves. CI retries failed tests twice to absorb network flakiness.

## 5. Entry / exit criteria
- **Entry:** API reachable (`GET /ping` returns 201).
- **Exit:** all automated tests green; known defects documented and marked `test.fail()`; no unreviewed failures.

## 6. Risks
| Risk | Mitigation |
|---|---|
| Shared environment, other users change data | Unique test data, own fixtures, no reliance on existing bookings |
| Public API downtime or slowness | Retries in CI, health-check test first |
| Known defects make tests fail | Tracked as BUG-00X and marked `test.fail()` |

## 7. Deliverables
Automated suite, Postman collection, this plan, test cases (`test-cases.md`), bug reports (`bug-reports/`), HTML test report published on GitHub Pages.
