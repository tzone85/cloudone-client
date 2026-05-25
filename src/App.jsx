import { useState } from "react";
import { Header } from "./components/Header.jsx";
import { PrinterForm } from "./components/PrinterForm.jsx";
import { PrinterTable } from "./components/PrinterTable.jsx";
import { usePrinters } from "./services/use-printers.js";

export function App() {
  const printers = usePrinters();
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  return (
    <>
      <Header />
      <main className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="h3 mb-0">Printers</h1>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => setEditing({ printerName: "", printerIp: "", status: true })}
          >
            New printer
          </button>
        </div>

        <PrinterTable
          items={printers.items}
          loading={printers.loading}
          error={printers.error}
          onEdit={setEditing}
          onDelete={setConfirmDelete}
          onRetry={printers.refresh}
        />

        {editing && (
          <Drawer title={editing.id ? "Edit printer" : "Create printer"} onClose={() => setEditing(null)}>
            <PrinterForm
              initial={editing}
              submitLabel={editing.id ? "Update" : "Create"}
              onCancel={() => setEditing(null)}
              onSubmit={async (values) => {
                const r = editing.id
                  ? await printers.update(editing.id, values)
                  : await printers.create(values);
                if (r.ok) setEditing(null);
                return r;
              }}
            />
          </Drawer>
        )}

        {confirmDelete && (
          <Drawer title="Delete printer" onClose={() => setConfirmDelete(null)}>
            <p>Delete <strong>{confirmDelete.printerName}</strong>?</p>
            <div className="d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-outline-secondary" onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={async () => {
                  await printers.remove(confirmDelete.id);
                  setConfirmDelete(null);
                }}
              >
                Delete
              </button>
            </div>
          </Drawer>
        )}
      </main>
    </>
  );
}

function Drawer({ title, children, onClose }) {
  return (
    <div className="card my-4 shadow-sm" role="dialog" aria-label={title}>
      <div className="card-header d-flex justify-content-between align-items-center">
        <h2 className="h5 mb-0">{title}</h2>
        <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
}
