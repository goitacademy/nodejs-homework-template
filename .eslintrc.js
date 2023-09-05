module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ["standard", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ["regexp"],
  rules: {
    "regexp/no-escape-backspace": "error",
  },
};
