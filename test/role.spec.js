const role = require('../helpers/role');
const {HttpCode, Gender} = require('../helpers/constants');
const {User} = require('../model/__mocks__/data');

describe('Unit test: helper/role', ()=>{
    const req={user:User}
    const res={
        status: jest.fn().mockReturnThis(),
        json:jest.fn(response => response),
    }
    const next = jest.fn();
    // it('run function with rigth role', function () {}); it===test
    test('run function with rigth role', function () {
        role(Gender.MALE)(req, res, next)
        expect(next).toHaveBeenCalled()
    });
    test('run function with wrong role', function () {
        const result = role(Gender.FEMALE)(req,res,next)
        expect(result.status).toEqual('error')
        expect(result.code).toEqual(HttpCode.FORBIDDEN)
        expect(result.message).toEqual('Access denied')
    });
})
