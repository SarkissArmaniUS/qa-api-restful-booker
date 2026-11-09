import { test, expect } from '../src/fixtures';
import { buildBooking } from '../src/data/booking';

test.describe('Update & delete (authorization required)', () => {
  test('PUT /booking/:id with a token replaces the booking', async ({ client, booking, token }) => {
    const update = buildBooking({ firstname: 'Updated', totalprice: 999 });
    const res = await client.update(booking.id, update, token);
    expect(res.status()).toBe(200);
    expect(await res.json()).toMatchObject(update);

    const check = await client.get(booking.id);
    expect(await check.json()).toMatchObject(update);
  });

  test('PATCH /booking/:id changes only the sent fields', async ({ client, booking, token }) => {
    const res = await client.partialUpdate(booking.id, { firstname: 'Patched' }, token);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.firstname).toBe('Patched');
    expect(body.lastname).toBe(booking.data.lastname);
    expect(body.totalprice).toBe(booking.data.totalprice);
  });

  test('PUT without a token is forbidden (403)', async ({ client, booking }) => {
    const res = await client.update(booking.id, buildBooking());
    expect(res.status()).toBe(403);
  });

  test('PATCH with an invalid token is forbidden (403)', async ({ client, booking }) => {
    const res = await client.partialUpdate(booking.id, { firstname: 'Hacker' }, 'invalid-token');
    expect(res.status()).toBe(403);
  });

  test('DELETE without a token is forbidden (403)', async ({ client, booking }) => {
    const res = await client.delete(booking.id);
    expect(res.status()).toBe(403);
    // booking must still exist
    expect((await client.get(booking.id)).status()).toBe(200);
  });

  test('DELETE with a token removes the booking', async ({ client, booking, token }) => {
    const res = await client.delete(booking.id, token);
    expect(res.status()).toBe(201); // API quirk, see known-bugs.spec.ts (BUG-004)
    expect((await client.get(booking.id)).status()).toBe(404);
  });
});
