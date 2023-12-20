module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['standard', 'prettier'],
  ignorePatterns: ['./node_modules'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {},
}
