import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js"],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      prettier,
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
      ...prettierConfig.rules,

      "@typescript-eslint/no-unused-vars": "error", // TypeScript-aware rule
      "no-console": "warn",
      // 'no-undef': 'error',  // Usually not needed with TypeScript
      "no-unused-expressions": "error",
      "no-unreachable": "error",
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    },
  },
];
