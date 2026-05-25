import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: ["./tests/setup.js"],
    include: ["tests/unit/**/*.test.{js,jsx}"],
    exclude: ["tests/e2e/**", "node_modules/**", "dist/**"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.{js,jsx}"],
      // Exclude composition root + purely presentational components (covered
      // by Playwright e2e flows rather than unit tests).
      exclude: [
        "src/main.jsx",
        "src/App.jsx",
        "src/components/Header.jsx",
        "src/components/PrinterRow.jsx",
        "src/services/use-printers.js",
        "src/fixtures/**",
      ],
      reporter: ["text", "html"],
      thresholds: { lines: 80, branches: 75, functions: 80, statements: 80 },
    },
  },
});
