# QA Automation: restful-booker API (Playwright + TypeScript)

[![API Tests](https://github.com/SarkissArmaniUS/qa-api-restful-booker/actions/workflows/api-tests.yml/badge.svg)](https://github.com/SarkissArmaniUS/qa-api-restful-booker/actions/workflows/api-tests.yml)
[![Report](https://img.shields.io/badge/Test%20report-live-brightgreen)](https://sarkissarmanius.github.io/qa-api-restful-booker/)

API test suite for the [restful-booker](https://restful-booker.herokuapp.com/apidoc/index.html) demo service, with a Postman collection, a test plan, test cases and bug reports.

## Tech stack
Playwright (API testing) · TypeScript · Zod (schema validation) · Postman + Newman · GitHub Actions · GitHub Pages

## What is covered
| Area | Examples |
|---|---|
| Auth | valid token, wrong/empty credentials |
| CRUD | create, read, filter, PUT, PATCH, DELETE with state verification |
| Authorization | no token / invalid token returns 403 |
| Contract | response schemas validated with Zod |
| Negative | non-existent ids, missing fields |
| Known defects | 5 documented bugs, tracked as `test.fail()` tests |

## Project structure
```
src/api/        BookingClient: thin wrapper over the endpoints
src/schemas/    Zod schemas for response validation
src/data/       Test data builders
src/fixtures.ts Fixtures: client, auth token, self-cleaning booking
tests/          Spec files
postman/        Postman collection (run in CI with Newman)
docs/           Test plan, test cases, bug reports
```

## Documentation
- [Test plan](docs/test-plan.md)
- [Test cases](docs/test-cases.md)
- [Bug reports](docs/bug-reports/)

## Design decisions
- **Independent tests:** each test gets its own booking via a fixture that cleans up after itself, so tests run in parallel safely.
- **Known bugs as `test.fail()`:** tests assert the correct behavior; while the bug exists they "fail as expected" and CI stays green, and when the API is fixed CI turns red as a reminder.
- **Assertions live in tests,** the client only sends requests.

## Run locally
```bash
npm ci
npm test            # Playwright API tests
npm run report      # open HTML report
npm run postman     # Postman collection via Newman
```
