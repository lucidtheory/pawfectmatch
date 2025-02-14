import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";
import pluginA11y from "eslint-plugin-jsx-a11y";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      prettier: pluginPrettier,
      a11y: pluginA11y,
    },
    rules: {
      "react/react-in-jsx-scope": "off",

      // Accessibility Rules
      "a11y/anchor-is-valid": [
        "warn", 
        {
          "aspects": ["noHref", "invalidHref", "preferButton"]
        }
      ],
      "a11y/alt-text": "warn",
      "a11y/aria-role": "warn",
      "a11y/aria-props": "warn",
      "a11y/aria-unsupported-elements": "warn",
      "a11y/heading-has-content": "warn",
      "a11y/heading-order": "warn",
      "a11y/no-autofocus": "warn",
      "a11y/no-onchange": "warn",
      "a11y/no-noninteractive-element-interactions": "warn",
      "a11y/no-noninteractive-tabindex": "warn",
      "a11y/tabindex-no-positive": "warn",
      "a11y/valid-aria-role": "warn",
      "a11y/valid-alt-text": "warn",
      "a11y/scope": "warn",
    },
  },
];
