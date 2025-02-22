module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
    },
    extends: ['standard', 'prettier', "eslint:recommended"],
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        "consistent-return": 2,
        "indent": [1, 4],
        "no-else-return": 1,
        "semi": [1, "always"],
        "space-unary-ops": 2
    },
};
