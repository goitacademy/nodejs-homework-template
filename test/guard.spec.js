
const guard = require('../helpers/guard');
const { HttpCode } = require('../helpers/constants');
const { User } = require('../model/__mocks__/data');




describe('Unit test: helper/guard ', () => {
  // const req = { user: User }
  const { token } = User
  console.log('TOKEN:',token);
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(r => r),
  }
  const next = jest.fn();
  test('run function with alowed', () => {
    guard(token)(req, res, next)
    expect(next).toHaveBeenCalled()
  })
  it('run function with dismiss', () => {
    const result = guard(token)(req, res, next)
        expect(result.status).toEqual('error')
        expect(result.code).toEqual(HttpCode.FORBIDDEN)
        expect(result.message).toEqual('Access denied')})
})




// const passport = require('passport');
// const { HttpCode } = require('../helpers/constants');
// const { json } = require('express');
// const { expectCt } = require('helmet');
// require('../config/passport');

// const    guard = (req, res, next) => {
//   passport.authenticate(
//     'jwt', 
//     { session: false },
//     (err, user) => {
//       let token = null
//       if (req.get('Authorization')) {
//         token = req.get('Authorization').split(' ')[1]
//       }
//     if (!user || err || token !== user.token) {
//       return res.status(HttpCode.UNAUTHORIZED).json({
//       status: 'error',
//       code: HttpCode.UNAUTHORIZED,
//     message: "Unauthorized"
//     })
//   }
//     req.user = user
//   return next()
// })
//     (req,  res,  next)
//   }
module.exports = guard
