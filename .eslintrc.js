module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    'jest/globals': true,
  },
  extends: ['standard'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'comma-dangle': 'on',
    'space-before-function-paren': 'off',
  },
};
