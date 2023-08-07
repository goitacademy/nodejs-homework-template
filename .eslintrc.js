module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["standard", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {},
  globals: {
    afterAll: true,
    beforeAll: true,
    test: true,
    it: true,
    beforeEach: true,
    expect: true,
  },
};
