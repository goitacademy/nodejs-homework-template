const request = require('supertest')
const mongoose = require('mongoose')
require('dotenv').config()
const app = require('../app')

const { DB_HOST } = process.env
const { User } = require('../model')
const { response } = require('../app')

// describe('test user', () => {
//   let server
//   beforeAll(() => (server = app.listen(3000)))
//   afterAll(() => server.close())

//   beforeEach((done) => {
//     mongoose.connect(DB_HOST).then(() => done())
//   })

//   afterEach((done) => {
//     mongoose.connection.db.dropDatabase(() => {
//       mongoose.connection.close(() => done())
//     })
//   })

//   test('test signup route', async () => {
//     const registerData = {
//       email: 'julia-Vla@gmail.com',
//       password: '876julia',
//     }
//     const response = await request(app)
//       .post('/api/users/signup')
//       .send(registerData)

//     expect(response.statusCode).toBe(201)

//     const user = await User.findById(response.body._id)
//     // const userAll = await User.findById(response.body)
//     console.log('userAll', response.statusCode)
//     // expect(user).toBeTruthy()

//     // expect(user.token).toByThruthy()
//     // expect(user.email).toBe(registerData.email)
//     // expect(user.password).toBe(registerData.password)
//   })
// })
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

    const user = await User.findById({ _id: '61f16673fea0a4c6e951fdac' })
    const userAll = await User.findOne({ email: 'julia-Sereda@gmail.com' })
    console.log('user', user)
    // expect(user).toBeTruthy()

    expect(userAll.token).toBeTruthy()
    // expect(user.email).toBe(registerData.email)
    // expect(user.password).toBe(registerData.password)
  })
})
