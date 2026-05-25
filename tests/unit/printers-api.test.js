import { describe, expect, it, vi } from "vitest";
import { createPrintersApi } from "../../src/services/printers-api.js";

describe("MockPrintersApi", () => {
  it("lists fixture items", async () => {
    const api = createPrintersApi({ apiBase: "mock://" });
    const r = await api.list();
    expect(r.ok).toBe(true);
    expect(r.items.length).toBeGreaterThan(0);
  });

  it("creates with auto-incrementing id", async () => {
    const api = createPrintersApi({ apiBase: "mock://" });
    const a = await api.create({ printerName: "A", printerIp: "1.1.1.1", status: true });
    const b = await api.create({ printerName: "B", printerIp: "2.2.2.2", status: false });
    expect(a.item.id).toBeLessThan(b.item.id);
  });

  it("updates only the patched fields", async () => {
    const api = createPrintersApi({ apiBase: "mock://" });
    const list = (await api.list()).items;
    const target = list[0];
    const r = await api.update(target.id, { status: !target.status });
    expect(r.ok).toBe(true);
    expect(r.item.status).toBe(!target.status);
    expect(r.item.printerName).toBe(target.printerName);
  });

  it("update returns 404 for unknown id", async () => {
    const api = createPrintersApi({ apiBase: "mock://" });
    const r = await api.update(99999, { status: false });
    expect(r.ok).toBe(false);
    expect(r.error.status).toBe(404);
  });

  it("removes and 404s thereafter", async () => {
    const api = createPrintersApi({ apiBase: "mock://" });
    const list = (await api.list()).items;
    const target = list[0];
    expect((await api.remove(target.id)).ok).toBe(true);
    expect((await api.remove(target.id)).ok).toBe(false);
  });
});

describe("HttpPrintersApi", () => {
  function mockOk(json, status = 200) {
    return { ok: status < 400, status, statusText: status < 400 ? "OK" : "Err", json: () => Promise.resolve(json) };
  }

  it("list GETs /printers and returns array", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(mockOk([{ id: 1 }]));
    const api = createPrintersApi({ apiBase: "https://api.test", fetchImpl });
    const r = await api.list();
    expect(fetchImpl).toHaveBeenCalledWith("https://api.test/printers", expect.anything());
    expect(r.items).toEqual([{ id: 1 }]);
  });

  it("create POSTs body", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(mockOk({ id: 7 }));
    const api = createPrintersApi({ apiBase: "https://api.test", fetchImpl });
    const r = await api.create({ printerName: "X", printerIp: "1.1.1.1", status: true });
    expect(fetchImpl).toHaveBeenCalledWith(
      "https://api.test/printers",
      expect.objectContaining({ method: "POST", body: expect.stringContaining('"printerName":"X"') }),
    );
    expect(r.item.id).toBe(7);
  });

  it("update PUTs to /printers/:id", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(mockOk({ id: 1 }));
    const api = createPrintersApi({ apiBase: "https://api.test", fetchImpl });
    await api.update(1, { status: false });
    expect(fetchImpl).toHaveBeenCalledWith("https://api.test/printers/1", expect.objectContaining({ method: "PUT" }));
  });

  it("remove DELETEs", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: true, status: 204 });
    const api = createPrintersApi({ apiBase: "https://api.test", fetchImpl });
    const r = await api.remove(1);
    expect(r.ok).toBe(true);
  });

  it("non-2xx returns error envelope", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(mockOk(null, 500));
    const api = createPrintersApi({ apiBase: "https://api.test", fetchImpl });
    const r = await api.list();
    expect(r.ok).toBe(false);
    expect(r.error.status).toBe(500);
  });

  it("transport error returns ok=false", async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new Error("ECONNREFUSED"));
    const api = createPrintersApi({ apiBase: "https://api.test", fetchImpl });
    const r = await api.list();
    expect(r.ok).toBe(false);
    expect(r.error.status).toBe(0);
  });
});
