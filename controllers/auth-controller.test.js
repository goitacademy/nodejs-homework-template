// const { describe } = require('yargs');
const { login } = require('./auth-controller');

describe('test login function', () => {
    test('status 200 OK', () => {
        const result = login();
        // expect(login)
    });
})