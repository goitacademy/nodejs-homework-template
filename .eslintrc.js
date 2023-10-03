module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  plugins: ["jest"],
  extends: ["standard", "prettier", "plugin:jest/recommended"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {},
};
