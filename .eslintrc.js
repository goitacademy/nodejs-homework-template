module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: ["standard", "plugin:json/recommended", "prettier"],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    "comma-dangle": "off",
    "space-before-function-paren": "off",
  }
}
