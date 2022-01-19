// BONUS TASK
const mongoose = require('mongoose')
const request = require('supertest')
require('dotenv').config()

const app = require('../../app')
const { User } = require('../../models/user')

const { DB_HOST } = process.env

describe('test auth', () => {
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
    const loginData = {
      email: 'bogdan@gmail.com',
      password: '123456',
    }

    const response = await request(app)
      .post('/api/auth/login')
      .send(loginData)

    // check response
    console.log('returns', response.body)
    expect(response.statusCode).toBe(200)
    expect(response.body.token).toBeTruthy()
    expect(
      Object.keys(response.body.user).includes('email') &&
        Object.keys(response.body.user).includes('subscription')
    ).toBeTruthy()
    expect(typeof (response.body.user.email)).toBe('string')
    expect(typeof response.body.user.subscription).toBe('string')
  })
})