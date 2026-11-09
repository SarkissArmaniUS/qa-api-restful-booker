import { test as base, expect } from '@playwright/test';
import { BookingClient } from './api/BookingClient';
import { ADMIN, Booking, buildBooking } from './data/booking';
import { createBookingResponseSchema, tokenSchema } from './schemas/booking.schema';

type Fixtures = {
  client: BookingClient;
  token: string;
  /** A booking created before the test and cleaned up afterwards. */
  booking: { id: number; data: Booking };
};

export const test = base.extend<Fixtures>({
  client: async ({ request }, use) => {
    await use(new BookingClient(request));
  },

  token: async ({ client }, use) => {
    const res = await client.createToken(ADMIN.username, ADMIN.password);
    expect(res.status()).toBe(200);
    const { token } = tokenSchema.parse(await res.json());
    await use(token);
  },

  booking: async ({ client, token }, use) => {
    const data = buildBooking();
    const res = await client.create(data);
    expect(res.status()).toBe(200);
    const body = createBookingResponseSchema.parse(await res.json());
    await use({ id: body.bookingid, data });
    // Cleanup; ignore the result (the test may have deleted it already)
    await client.delete(body.bookingid, token);
  },
});

export { expect };
