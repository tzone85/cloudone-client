import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PrinterTable } from "../../src/components/PrinterTable.jsx";

const items = [
  { id: 1, printerName: "A", printerIp: "10.0.0.1", status: true },
  { id: 2, printerName: "B", printerIp: "10.0.0.2", status: false },
];

describe("PrinterTable", () => {
  it("loading", () => {
    render(<PrinterTable items={[]} loading error={null} />);
    expect(screen.getByRole("status")).toHaveTextContent(/loading/i);
  });

  it("empty", () => {
    render(<PrinterTable items={[]} loading={false} error={null} />);
    expect(screen.getByText(/no printers yet/i)).toBeInTheDocument();
  });

  it("error + retry", () => {
    const onRetry = vi.fn();
    render(<PrinterTable items={[]} loading={false} error={{ message: "x" }} onRetry={onRetry} />);
    fireEvent.click(screen.getByRole("button", { name: /retry/i }));
    expect(onRetry).toHaveBeenCalled();
  });

  it("rows render with edit + delete buttons", () => {
    const onEdit = vi.fn(), onDelete = vi.fn();
    render(<PrinterTable items={items} loading={false} error={null} onEdit={onEdit} onDelete={onDelete} />);
    expect(screen.getAllByTestId(/printer-row-/)).toHaveLength(2);
    fireEvent.click(screen.getAllByRole("button", { name: /edit/i })[0]);
    expect(onEdit).toHaveBeenCalledWith(items[0]);
    fireEvent.click(screen.getAllByRole("button", { name: /delete/i })[1]);
    expect(onDelete).toHaveBeenCalledWith(items[1]);
  });
});
