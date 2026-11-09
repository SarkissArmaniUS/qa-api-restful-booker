import { test, expect } from '../src/fixtures';
import { ADMIN } from '../src/data/booking';
import { tokenSchema } from '../src/schemas/booking.schema';

test.describe('Health check & authentication', () => {
  test('GET /ping confirms the API is up', async ({ client }) => {
    const res = await client.ping();
    expect(res.status()).toBe(201);
  });

  test('POST /auth with valid credentials returns a token', async ({ client }) => {
    const res = await client.createToken(ADMIN.username, ADMIN.password);
    expect(res.status()).toBe(200);
    expect(tokenSchema.safeParse(await res.json()).success).toBe(true);
  });

  test('POST /auth with a wrong password does not return a token', async ({ client }) => {
    const res = await client.createToken(ADMIN.username, 'wrong-password');
    const body = await res.json();
    expect(body.token).toBeUndefined();
    expect(body.reason).toBe('Bad credentials');
  });

  test('POST /auth with empty credentials does not return a token', async ({ client }) => {
    const res = await client.createToken('', '');
    const body = await res.json();
    expect(body.token).toBeUndefined();
  });
});
