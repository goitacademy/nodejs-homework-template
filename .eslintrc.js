module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    'jest/globals': true,
  },
  plugins: ['jest'],
  extends: ['standard', 'plugin:jest/recommended'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'comma-dangle': 'off',
    'space-before-function-paren': 'off',
  },
}