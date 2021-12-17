module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["standard"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    quotes: [2, "double", { avoidEscape: true }],
    "comma-dangle": "on",
    "space-before-function-paren": "off",
  },
};
