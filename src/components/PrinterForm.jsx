import { useState } from "react";
import { validatePrinter } from "../services/validate-printer.js";

const empty = { printerName: "", printerIp: "", status: true };

export function PrinterForm({
  initial = empty,
  submitLabel = "Save",
  onSubmit,
  onCancel,
}) {
  const [values, setValues] = useState(initial);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const validation = validatePrinter(values);

  function update(field) {
    return (ev) =>
      setValues((v) => ({
        ...v,
        [field]: field === "status" ? ev.target.checked : ev.target.value,
      }));
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (!validation.ok) return;
    setSubmitting(true);
    setServerError(null);
    const r = await onSubmit(values);
    setSubmitting(false);
    if (!r.ok) {
      setServerError(r.error?.message ?? "request failed");
      return;
    }
    setValues(empty);
  }

  return (
    <form onSubmit={handleSubmit} aria-label="printer form">
      <div className="mb-3">
        <label htmlFor="printerName" className="form-label">
          Printer name
        </label>
        <input
          id="printerName"
          className={`form-control ${validation.errors.printerName ? "is-invalid" : ""}`}
          value={values.printerName}
          onChange={update("printerName")}
          maxLength={80}
          required
        />
        {validation.errors.printerName && (
          <div className="invalid-feedback">
            {validation.errors.printerName}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="printerIp" className="form-label">
          Printer IP
        </label>
        <input
          id="printerIp"
          className={`form-control ${validation.errors.printerIp ? "is-invalid" : ""}`}
          value={values.printerIp}
          onChange={update("printerIp")}
          placeholder="10.0.1.21"
          required
        />
        {validation.errors.printerIp && (
          <div className="invalid-feedback">{validation.errors.printerIp}</div>
        )}
      </div>

      <div className="form-check mb-3">
        <input
          id="status"
          type="checkbox"
          className="form-check-input"
          checked={!!values.status}
          onChange={update("status")}
        />
        <label htmlFor="status" className="form-check-label">
          Online
        </label>
      </div>

      {serverError && (
        <div role="alert" className="alert alert-danger">
          {serverError}
        </div>
      )}

      <div className="d-flex justify-content-end gap-2">
        {onCancel && (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!validation.ok || submitting}
        >
          {submitting ? "Saving…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
