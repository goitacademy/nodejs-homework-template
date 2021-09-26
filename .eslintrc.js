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
    quotes: "off",
    "comma-dangle": "off",
    semi: [2, "always"],
    "space-before-function-paren": "off",
  },
};
