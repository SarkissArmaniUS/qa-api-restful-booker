import { test, expect } from '../src/fixtures';
import { ADMIN } from '../src/data/booking';

/**
 * Known defects of the demo API, documented in docs/bug-reports/.
 * Each test asserts the CORRECT behavior and is marked test.fail():
 *  - while the bug exists, the test "fails as expected" and the suite stays green;
 *  - once the API is fixed, the test unexpectedly passes and CI turns red,
 *    reminding us to remove the marker.
 */
test.describe('Known bugs (expected to fail)', () => {
  test.fail('BUG-001: POST /booking with missing required fields should return 400', async ({ client }) => {
    const res = await client.create({ firstname: 'OnlyFirstName' });
    expect(res.status()).toBe(400);
  });

  test.fail('BUG-002: POST /auth with bad credentials should return 401', async ({ client }) => {
    const res = await client.createToken(ADMIN.username, 'wrong-password');
    expect(res.status()).toBe(401);
  });

  test.fail('BUG-003: PUT on a non-existent booking should return 404', async ({ client, token }) => {
    const res = await client.update(999999999, { firstname: 'x' }, token);
    expect(res.status()).toBe(404);
  });

  test.fail('BUG-004: DELETE of an existing booking should return 200 or 204, not 201', async ({ client, booking, token }) => {
    const res = await client.delete(booking.id, token);
    expect([200, 204]).toContain(res.status());
  });

  test.fail('BUG-005: DELETE of a non-existent booking should return 404', async ({ client, token }) => {
    const res = await client.delete(999999999, token);
    expect(res.status()).toBe(404);
  });
});
