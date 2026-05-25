import { PrinterRow } from "./PrinterRow.jsx";

export function PrinterTable({ items, loading, error, onEdit, onDelete, onRetry }) {
  if (loading) return <p role="status" className="text-center py-4">Loading printers…</p>;
  if (error) {
    return (
      <div role="alert" className="alert alert-danger d-flex justify-content-between align-items-center">
        <span>Couldn’t load printers ({error.message ?? "unknown"})</span>
        <button type="button" className="btn btn-outline-danger btn-sm" onClick={onRetry}>Retry</button>
      </div>
    );
  }
  if (!items.length) return <p className="text-center py-4 text-muted">No printers yet — add one to get started.</p>;

  return (
    <table className="table table-hover">
      <thead className="table-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Printer name</th>
          <th scope="col">Printer IP</th>
          <th scope="col">Status</th>
          <th scope="col" className="text-end">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((p, i) => (
          <PrinterRow key={p.id} index={i + 1} printer={p} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
}
