const IPV4_RE = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;

export function validatePrinter({ printerName, printerIp }) {
  const errors = {};
  const name = (printerName ?? "").trim();
  if (name.length === 0) errors.printerName = "name is required";
  else if (name.length > 80) errors.printerName = "name must be ≤80 chars";
  const ip = (printerIp ?? "").trim();
  if (ip.length === 0) errors.printerIp = "ip is required";
  else if (!IPV4_RE.test(ip)) errors.printerIp = "must be a valid IPv4 address";
  return { ok: Object.keys(errors).length === 0, errors };
}
