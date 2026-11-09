# Test Cases

| ID | Title | Steps | Expected result | Automated in |
|---|---|---|---|---|
| TC-01 | Health check | GET /ping | 201 Created | health-auth.spec.ts |
| TC-02 | Get token, valid credentials | POST /auth with admin / password123 | 200, body contains non-empty `token` | health-auth.spec.ts |
| TC-03 | Get token, wrong password | POST /auth with wrong password | No `token` in the response | health-auth.spec.ts |
| TC-04 | Get token, empty credentials | POST /auth with empty username and password | No `token` in the response | health-auth.spec.ts |
| TC-05 | List bookings | GET /booking | 200, array of `{bookingid}` | booking-read.spec.ts |
| TC-06 | Get booking by id | Create booking, GET /booking/:id | 200, data equals the created booking | booking-read.spec.ts |
| TC-07 | Filter by last name | Create booking, GET /booking?lastname=X | Response contains the created id | booking-read.spec.ts |
| TC-08 | Get non-existent booking | GET /booking/999999999 | 404 | booking-read.spec.ts |
| TC-09 | Create booking | POST /booking with valid body | 200, `bookingid` + echoed data | booking-create.spec.ts |
| TC-10 | Create without optional field | POST /booking without `additionalneeds` | 200, booking created | booking-create.spec.ts |
| TC-11 | Full update | PUT /booking/:id with token | 200, all fields replaced | booking-update-delete.spec.ts |
| TC-12 | Partial update | PATCH /booking/:id `{firstname}` with token | 200, only firstname changed | booking-update-delete.spec.ts |
| TC-13 | Update without token | PUT /booking/:id, no token | 403 | booking-update-delete.spec.ts |
| TC-14 | Update with invalid token | PATCH /booking/:id, bad token | 403 | booking-update-delete.spec.ts |
| TC-15 | Delete without token | DELETE /booking/:id, no token | 403, booking still exists | booking-update-delete.spec.ts |
| TC-16 | Delete with token | DELETE /booking/:id with token, then GET | Deleted, subsequent GET returns 404 | booking-update-delete.spec.ts |
| TC-17 | Create with missing fields | POST /booking with only `firstname` | 400 Bad Request (see BUG-001) | known-bugs.spec.ts |
| TC-18 | Auth with bad credentials status | POST /auth wrong password | 401 Unauthorized (see BUG-002) | known-bugs.spec.ts |
| TC-19 | Update non-existent booking | PUT /booking/999999999 with token | 404 (see BUG-003) | known-bugs.spec.ts |
| TC-20 | Delete success status | DELETE existing booking with token | 200 or 204 (see BUG-004) | known-bugs.spec.ts |
| TC-21 | Delete non-existent booking | DELETE /booking/999999999 with token | 404 (see BUG-005) | known-bugs.spec.ts |
