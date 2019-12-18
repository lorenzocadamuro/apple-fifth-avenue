module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ["google"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    indent: ["error", 2, { SwitchCase: 1 }],
    "valid-jsdoc": 0,
    "require-jsdoc": 0,
    "no-var": "error",
    "no-unused-vars": 1,
    "new-cap": 0,
    "prefer-template": 2,
    semi: ["error", "never"],
    "array-element-newline": 0,
    "max-len": ["error", { code: 800 }],

    "prefer-const": 1,
    "arrow-spacing": ["error", { before: true, after: true }],
    "comma-dangle": [
      "error",
      {
        objects: "only-multiline",
        arrays: "only-multiline",
        imports: "never",
        exports: "never",
        functions: "never",
      },
    ],
  },
}
