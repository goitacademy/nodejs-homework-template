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
    "comma-dangle": "off",
    "space-before-function-paren": "off",
    semi: 0,
    quotes: [0, "single", { avoidEscape: true }],
  },
};
