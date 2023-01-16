module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["google", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "require-jsdoc": "off",
  },
};
