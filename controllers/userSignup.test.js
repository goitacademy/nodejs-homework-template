const request = require('supertest')
const mongoose = require('mongoose')
require('dotenv').config()
const { Unauthorized } = require('http-error')
const Joi = require('joi')
const app = require('../app')

const { DB_HOST } = process.env
const { User } = require('../model')

const joiValidation = Joi.object({
  email: Joi.string(),
  subscription: Joi.string(),
})
function errorEmail() {
  throw new Unauthorized('Email is wrong')
}
function errorPassword() {
  throw new Unauthorized('Password is wrong')
}

//
describe('test user', () => {
  let server
  beforeAll(() => (server = app.listen(3000)))
  afterAll(() => server.close())

  beforeEach((done) => {
    mongoose.connect(DB_HOST).then(() => done())
  })

  afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done())
    })
  })

  test('test login route', async () => {
    const registerData = {
      email: 'julia-Sereda@gmail.com',
      password: '876julia',
    }
    const response = await request(app)
      .post('/api/users/login')
      .send(registerData)

    expect(response.statusCode).toBe(200)

    const userData = await User.findOne({ email: 'julia-Sereda@gmail.com' })
    expect(userData).toBeTruthy()

    const { token, user } = response.body
    expect(token).toBeTruthy()

    const validation = joiValidation.validate({
      email: userData.email,
      subscription: userData.subscription,
    })
    expect(user.email).toBe(validation.value.email)

    const validString = {
      email: userData.email,
      subscription: userData.subscription,
    }
    expect(validString).toStrictEqual(validation.value)

    expect(() => errorEmail()).toThrow('Email is wrong')
    expect(() => errorPassword()).toThrow('Password is wrong')
  })
})

// expect(user).toBeTruthy()
// // const {token, user} =
// expect(response.body.token).toBeTruthy()

// const validation = joiValidation.validate({
//   email: user.email,
//   subscription: user.subscription,
// })

// expect(response.body.user.email).toBe(validation.value.email) // work
