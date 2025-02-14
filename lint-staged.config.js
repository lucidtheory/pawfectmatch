export default {
    "**/*.{ts,tsx}": [
      "prettier --write",
      "eslint --fix"
    ],
    "*": () => "npx tsc --noEmit --skipLibCheck -p tsconfig.app.json"
  };