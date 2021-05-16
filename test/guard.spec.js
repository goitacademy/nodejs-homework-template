const guard = require('../helper/guard')
const { HttpCode } = require('../helper/constants')
const { User } = require('../model/__mocks__/data')
const { JsonWebTokenError } = require('jsonwebtoken')
const passport = require('passport')


require('../config/passport')

describe('Unit test: helper/guard', () => {
    const req = { get: jest.fn((header) => `Bearer ${User.token}`), user: User }
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn((resp) => resp),
    }
    const next = jest.fn()
    test('run guard with user', () => {
        passport.authenticate = jest.fn((authType, options, callback) => (req, res, next) => {
            callback(null, User)
        })
        guard(req, res, next)
        expect(next).toHaveBeenCalled()
    })

    test ('run guard without user', () => {
        passport.authenticate = jest.fn((authType, options, callback) => (req, res, next) => {
            callback(null, false)
        })
        guard(req, res, next)
        expect(req.get).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalled()
        expect(res.json).toHaveBeenCalled()
        expect(res.json).toHaveReturnedWith({
            status: 'error',
            code: HttpCode.UNAUTHORIZED,
            message: 'Not authorized',
        })
    })

    test('run guard wrong user token', () => {
    passport.authenticate = jest.fn(
      (authType, options, callback) => (req, res, next) => {
        callback(null, { token: null })
      },
    )
    guard(req, res, next)
    expect(req.get).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalled()
    expect(res.json).toHaveBeenCalled()
    expect(res.json).toHaveReturnedWith({
      status: 'error',
      code: HttpCode.UNAUTHORIZED,
      message: 'Not authorized',
    })
  })
})