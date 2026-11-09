import { APIRequestContext } from '@playwright/test';

/** Thin wrapper over the restful-booker endpoints. Assertions stay in the tests. */
export class BookingClient {
  constructor(private readonly request: APIRequestContext) {}

  private auth(token?: string) {
    return token ? { Cookie: `token=${token}` } : undefined;
  }

  ping() {
    return this.request.get('/ping');
  }

  createToken(username: string, password: string) {
    return this.request.post('/auth', { data: { username, password } });
  }

  list(params?: Record<string, string>) {
    return this.request.get('/booking', { params });
  }

  get(id: number) {
    return this.request.get(`/booking/${id}`);
  }

  create(data: unknown) {
    return this.request.post('/booking', { data });
  }

  update(id: number, data: unknown, token?: string) {
    return this.request.put(`/booking/${id}`, { data, headers: this.auth(token) });
  }

  partialUpdate(id: number, data: unknown, token?: string) {
    return this.request.patch(`/booking/${id}`, { data, headers: this.auth(token) });
  }

  delete(id: number, token?: string) {
    return this.request.delete(`/booking/${id}`, { headers: this.auth(token) });
  }
}
