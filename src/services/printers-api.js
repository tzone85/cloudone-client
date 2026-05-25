/**
 * Printer CRUD API client.
 *
 * VITE_API_BASE=mock:// (default) → in-process MockPrinterApi backed by the
 * fixture; great for offline dev + tests.
 *
 * VITE_API_BASE=https://your-api → real HTTP calls to ${base}/printers.
 *
 * Every method returns {ok, ...} so the hook can branch without throwing.
 */
import { PRINTERS_FIXTURE } from "../fixtures/printers.js";

const API_BASE = import.meta?.env?.VITE_API_BASE ?? "mock://";

export function createPrintersApi({ apiBase = API_BASE, fetchImpl = fetch } = {}) {
  if (apiBase === "mock://" || !apiBase) return new MockPrintersApi();
  return new HttpPrintersApi({ apiBase, fetchImpl });
}

class MockPrintersApi {
  constructor() {
    this.items = PRINTERS_FIXTURE.map((p) => ({ ...p }));
    this.next = this.items.reduce((m, p) => Math.max(m, p.id), 0) + 1;
  }
  async list() { return { ok: true, items: this.items.map((p) => ({ ...p })) }; }
  async create(input) {
    const item = { id: this.next++, ...input };
    this.items.push(item);
    return { ok: true, item: { ...item } };
  }
  async update(id, patch) {
    const idx = this.items.findIndex((p) => p.id === id);
    if (idx === -1) return { ok: false, error: { status: 404, message: "not found" } };
    this.items[idx] = { ...this.items[idx], ...patch };
    return { ok: true, item: { ...this.items[idx] } };
  }
  async remove(id) {
    const before = this.items.length;
    this.items = this.items.filter((p) => p.id !== id);
    if (this.items.length === before) return { ok: false, error: { status: 404, message: "not found" } };
    return { ok: true };
  }
}

class HttpPrintersApi {
  #apiBase; #fetch;
  constructor({ apiBase, fetchImpl }) { this.#apiBase = apiBase.replace(/\/$/, ""); this.#fetch = fetchImpl; }
  async list() {
    return this.#request("/printers");
  }
  async create(input) {
    return this.#request("/printers", { method: "POST", body: input });
  }
  async update(id, patch) {
    return this.#request(`/printers/${id}`, { method: "PUT", body: patch });
  }
  async remove(id) {
    return this.#request(`/printers/${id}`, { method: "DELETE" });
  }
  async #request(path, { method = "GET", body } = {}) {
    try {
      const response = await this.#fetch(`${this.#apiBase}${path}`, {
        method,
        headers: { "content-type": "application/json", accept: "application/json" },
        body: body !== undefined ? JSON.stringify(body) : undefined,
      });
      if (!response.ok) {
        return { ok: false, error: { status: response.status, message: response.statusText } };
      }
      if (response.status === 204) return { ok: true };
      const data = await response.json();
      if (method === "GET") return { ok: true, items: Array.isArray(data) ? data : [] };
      return { ok: true, item: data };
    } catch (err) {
      return { ok: false, error: { status: 0, message: err.message } };
    }
  }
}
