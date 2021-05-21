module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['standard', 'prettier', 'plugin:json/recommended'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {},
};
