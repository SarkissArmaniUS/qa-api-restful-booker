export type Booking = {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: { checkin: string; checkout: string };
  additionalneeds?: string;
};

export const ADMIN = {
  username: process.env.API_USER ?? 'admin',
  password: process.env.API_PASSWORD ?? 'password123', // public demo credentials
};

/** Builds a valid booking with a unique lastname (so filter tests are deterministic). */
export function buildBooking(overrides: Partial<Booking> = {}): Booking {
  const unique = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  return {
    firstname: 'Ivan',
    lastname: `Tester${unique}`,
    totalprice: 150,
    depositpaid: true,
    bookingdates: { checkin: '2026-12-01', checkout: '2026-12-10' },
    additionalneeds: 'Breakfast',
    ...overrides,
  };
}
