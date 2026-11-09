import { z } from 'zod';

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'expected YYYY-MM-DD');

export const bookingSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  totalprice: z.number(),
  depositpaid: z.boolean(),
  bookingdates: z.object({ checkin: isoDate, checkout: isoDate }),
  additionalneeds: z.string().optional(),
});

export const createBookingResponseSchema = z.object({
  bookingid: z.number().int().positive(),
  booking: bookingSchema,
});

export const bookingIdsSchema = z.array(z.object({ bookingid: z.number().int() }));

export const tokenSchema = z.object({ token: z.string().min(1) });
