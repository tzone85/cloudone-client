import { describe, expect, it } from "vitest";
import { validatePrinter } from "../../src/services/validate-printer.js";

describe("validatePrinter", () => {
  it("accepts a valid printer", () => {
    const r = validatePrinter({ printerName: "Reception", printerIp: "10.0.1.21" });
    expect(r.ok).toBe(true);
  });

  it("rejects empty name", () => {
    expect(validatePrinter({ printerName: "", printerIp: "10.0.0.1" }).errors.printerName).toMatch(/required/);
    expect(validatePrinter({ printerIp: "10.0.0.1" }).errors.printerName).toMatch(/required/);
  });

  it("rejects names longer than 80 chars", () => {
    expect(validatePrinter({ printerName: "x".repeat(81), printerIp: "1.1.1.1" }).errors.printerName).toMatch(/80/);
  });

  it("rejects invalid IPv4", () => {
    for (const ip of ["", "1.2.3", "1.2.3.4.5", "999.0.0.1", "abc"]) {
      const r = validatePrinter({ printerName: "n", printerIp: ip });
      expect(r.ok).toBe(false);
      expect(r.errors.printerIp).toBeTruthy();
    }
  });

  it("trims whitespace before checking", () => {
    expect(validatePrinter({ printerName: "  n  ", printerIp: "  10.0.0.1  " }).ok).toBe(true);
  });
});
