import { test, expect } from '../src/fixtures';
import { buildBooking } from '../src/data/booking';
import { createBookingResponseSchema } from '../src/schemas/booking.schema';

test.describe('Create booking', () => {
  test('POST /booking creates a booking and echoes the data', async ({ client, token }) => {
    const data = buildBooking();
    const res = await client.create(data);
    expect(res.status()).toBe(200);
    const body = createBookingResponseSchema.parse(await res.json());
    expect(body.booking).toMatchObject(data);
    await client.delete(body.bookingid, token);
  });

  test('created booking can be fetched with GET', async ({ client, token }) => {
    const data = buildBooking({ firstname: 'Olena' });
    const created = createBookingResponseSchema.parse(await (await client.create(data)).json());
    const res = await client.get(created.bookingid);
    expect(res.status()).toBe(200);
    expect((await res.json()).firstname).toBe('Olena');
    await client.delete(created.bookingid, token);
  });

  test('POST /booking works without optional additionalneeds', async ({ client, token }) => {
    const { additionalneeds, ...data } = buildBooking();
    const res = await client.create(data);
    expect(res.status()).toBe(200);
    const body = createBookingResponseSchema.parse(await res.json());
    expect(body.booking).toMatchObject(data);
    await client.delete(body.bookingid, token);
  });

  test('POST /booking response matches the schema', async ({ client, token }) => {
    const res = await client.create(buildBooking());
    const parsed = createBookingResponseSchema.safeParse(await res.json());
    expect(parsed.success).toBe(true);
    if (parsed.success) await client.delete(parsed.data.bookingid, token);
  });
});
