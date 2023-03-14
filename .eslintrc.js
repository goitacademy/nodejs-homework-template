module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["standard", "prettier", "jest", "node"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {},
};
