const request = require('supertest')
const mongoose = require('mongoose')
require('dotenv').config()
const { Unauthorized } = require('http-error')

const app = require('../app')

const { DB_HOST } = process.env
const { User } = require('../model')

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
    expect(user.subscription).toBe('string')
    expect(user.email).toBe(registerData.email)

    expect(() => errorEmail()).toThrow('Email is wrong')
    expect(() => errorPassword()).toThrow('Password is wrong')
  })
})
