export function PrinterRow({ index, printer, onEdit, onDelete }) {
  return (
    <tr data-testid={`printer-row-${printer.id}`}>
      <th scope="row">{index}</th>
      <td>{printer.printerName}</td>
      <td>{printer.printerIp}</td>
      <td>
        <span className={`badge ${printer.status ? "bg-success" : "bg-secondary"}`}>
          {printer.status ? "Online" : "Offline"}
        </span>
      </td>
      <td className="text-end">
        <button type="button" className="btn btn-sm btn-outline-primary me-2" onClick={() => onEdit(printer)}>Edit</button>
        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => onDelete(printer)}>Delete</button>
      </td>
    </tr>
  );
}
