import { expect, test } from "@playwright/test";

// Playwright's normal click + keyboard interactions hang on this Bootstrap 5
// page in headless Chromium. We sidestep the pointer pipeline entirely:
//   tap()    → dispatchEvent('click') for type="button" controls
//   submit() → form.requestSubmit() via page.evaluate
const tap = (locator) => locator.dispatchEvent("click");
const submitDialogForm = (page) =>
  page.evaluate(() => document.querySelector('[role="dialog"] form')?.requestSubmit());

test("creates, edits, then deletes a printer", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await expect(page.getByRole("heading", { name: /printers/i })).toBeVisible();

  await tap(page.getByRole("button", { name: /new printer/i }));
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByLabel(/printer name/i).fill("Lab HP");
  await page.getByLabel(/printer ip/i).fill("192.168.5.10");
  await submitDialogForm(page);
  await expect(page.getByText("Lab HP")).toBeVisible();

  const row = page.getByRole("row").filter({ hasText: "Lab HP" });
  await tap(row.getByRole("button", { name: /edit/i }));
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByLabel(/printer name/i).fill("Lab HP renamed");
  await submitDialogForm(page);
  await expect(page.getByText("Lab HP renamed")).toBeVisible();

  const row2 = page.getByRole("row").filter({ hasText: "Lab HP renamed" });
  await tap(row2.getByRole("button", { name: /delete/i }));
  await expect(page.getByRole("dialog")).toBeVisible();
  await tap(page.getByRole("dialog").getByRole("button", { name: /^delete$/i }));
  await expect(page.getByText("Lab HP renamed")).toHaveCount(0);
});

test("rejects invalid IPv4", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await tap(page.getByRole("button", { name: /new printer/i }));
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByLabel(/printer name/i).fill("Bad");
  await page.getByLabel(/printer ip/i).fill("not-an-ip");
  await expect(page.getByText(/valid ipv4/i)).toBeVisible();
  await expect(page.getByRole("button", { name: /create/i })).toBeDisabled();
});
