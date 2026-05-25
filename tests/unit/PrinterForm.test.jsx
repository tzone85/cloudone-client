import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PrinterForm } from "../../src/components/PrinterForm.jsx";

describe("PrinterForm", () => {
  it("disables submit until valid", () => {
    render(<PrinterForm onSubmit={vi.fn()} />);
    expect(screen.getByRole("button", { name: /save/i })).toBeDisabled();
  });

  it("validates IPv4", () => {
    render(<PrinterForm onSubmit={vi.fn()} />);
    fireEvent.change(screen.getByLabelText(/printer name/i), { target: { value: "Reception" } });
    fireEvent.change(screen.getByLabelText(/printer ip/i), { target: { value: "not-an-ip" } });
    expect(screen.getByText(/valid ipv4/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeDisabled();
  });

  it("submits when valid", async () => {
    const onSubmit = vi.fn().mockResolvedValue({ ok: true });
    render(<PrinterForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText(/printer name/i), { target: { value: "Reception" } });
    fireEvent.change(screen.getByLabelText(/printer ip/i), { target: { value: "10.0.1.21" } });
    fireEvent.click(screen.getByRole("button", { name: /save/i }));
    await new Promise((r) => setTimeout(r, 0));
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ printerName: "Reception", printerIp: "10.0.1.21" }));
  });

  it("shows server error on failure", async () => {
    const onSubmit = vi.fn().mockResolvedValue({ ok: false, error: { message: "boom" } });
    render(<PrinterForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText(/printer name/i), { target: { value: "Reception" } });
    fireEvent.change(screen.getByLabelText(/printer ip/i), { target: { value: "10.0.1.21" } });
    fireEvent.click(screen.getByRole("button", { name: /save/i }));
    await new Promise((r) => setTimeout(r, 0));
    expect(screen.getByRole("alert")).toHaveTextContent(/boom/);
  });
});
