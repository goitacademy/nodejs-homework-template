const router = require('../routes/auth');

console.log(router)

describe('Login and signup test', () => {
    beforeAll(() => {
        console.log('Tests start')
    })
    afterAll(()=> {
        console.log('Tests ended')
    })
    afterEach(()=> {
        console.log('Test ended')
    })
})