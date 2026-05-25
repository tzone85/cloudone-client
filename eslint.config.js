import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import hooks from "eslint-plugin-react-hooks";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, ...globals.node },
    },
    settings: { react: { version: "18.3" } },
    plugins: { react, "react-hooks": hooks },
    rules: {
      ...react.configs.recommended.rules,
      ...hooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
  { files: ["tests/**/*.{js,jsx}"], languageOptions: { globals: { ...globals.node, ...globals.browser } } },
  { ignores: ["dist/", "coverage/", "node_modules/", "playwright-report/", "test-results/"] },
];
