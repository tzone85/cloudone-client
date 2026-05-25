import { expect, test } from "@playwright/test";

test("creates, edits, then deletes a printer", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /printers/i })).toBeVisible();

  // create
  await page.getByRole("button", { name: /new printer/i }).click();
  await page.getByLabel(/printer name/i).fill("Lab HP");
  await page.getByLabel(/printer ip/i).fill("192.168.5.10");
  await page.getByRole("button", { name: /create/i }).click();

  await expect(page.getByText("Lab HP")).toBeVisible();

  // edit
  const row = page.getByRole("row").filter({ hasText: "Lab HP" });
  await row.getByRole("button", { name: /edit/i }).click();
  await page.getByLabel(/printer name/i).fill("Lab HP — renamed");
  await page.getByRole("button", { name: /update/i }).click();
  await expect(page.getByText("Lab HP — renamed")).toBeVisible();

  // delete
  const row2 = page.getByRole("row").filter({ hasText: "Lab HP — renamed" });
  await row2.getByRole("button", { name: /delete/i }).click();
  await page.getByRole("dialog").getByRole("button", { name: /^delete$/i }).click();
  await expect(page.getByText("Lab HP — renamed")).toHaveCount(0);
});

test("rejects invalid IPv4", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /new printer/i }).click();
  await page.getByLabel(/printer name/i).fill("Bad");
  await page.getByLabel(/printer ip/i).fill("not-an-ip");
  await expect(page.getByText(/valid ipv4/i)).toBeVisible();
  await expect(page.getByRole("button", { name: /create/i })).toBeDisabled();
});
