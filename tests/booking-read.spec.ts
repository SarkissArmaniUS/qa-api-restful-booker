import { test, expect } from '../src/fixtures';
import { bookingIdsSchema, bookingSchema } from '../src/schemas/booking.schema';

test.describe('Read bookings', () => {
  test('GET /booking returns a list of booking ids', async ({ client }) => {
    const res = await client.list();
    expect(res.status()).toBe(200);
    const ids = bookingIdsSchema.parse(await res.json());
    expect(ids.length).toBeGreaterThan(0);
  });

  test('GET /booking/:id returns the created booking', async ({ client, booking }) => {
    const res = await client.get(booking.id);
    expect(res.status()).toBe(200);
    expect(await res.json()).toMatchObject(booking.data);
  });

  test('GET /booking/:id response matches the schema', async ({ client, booking }) => {
    const res = await client.get(booking.id);
    expect(bookingSchema.safeParse(await res.json()).success).toBe(true);
  });

  test('GET /booking?lastname= filters by last name', async ({ client, booking }) => {
    const res = await client.list({ lastname: booking.data.lastname });
    expect(res.status()).toBe(200);
    const ids = bookingIdsSchema.parse(await res.json()).map((b) => b.bookingid);
    expect(ids).toContain(booking.id);
  });

  test('GET /booking/:id for a non-existent id returns 404', async ({ client }) => {
    const res = await client.get(999999999);
    expect(res.status()).toBe(404);
  });
});
