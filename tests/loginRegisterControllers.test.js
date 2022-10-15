const request = require('supertest')
const mongoose = require('mongoose')

const app = require('../app')

const { DB_HOST, PORT = 3000 } = process.env

describe('tests for login/register controllers', () => {
  beforeAll(() =>
    mongoose
      .connect(DB_HOST)
      .then(() => {
        console.log('database connection successful')
        app.listen(PORT, () => {
          console.log(`Server running. Use our API on port: ${PORT}`)
        })
      })
      .catch((error) => {
        console.log(`Server is not running. Error message: ${error.message}`)
        process.exit(1)
      })
  )

  test('login returns response status 200 and response body must contain a token ', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'John1234@gmail.com',
      password: 'qazwsx12345',
    })

    expect(response.status).toBe(200)
    expect(typeof response.body.token).toBe('string')
  })

  test('register returns response status 201 and response body must contain name, email and subscription type', async () => {
    const response = await request(app).post('/api/auth/register').send({
      username: 'Jhon',
      email: 'John1234@gmail.com',
      password: 'qazwsx12345',
    })
    const { name, email, subscription } = response.body
    expect(response.status).toBe(201)
    expect(typeof name).toBe('string')
    expect(typeof email).toBe('string')
    expect(typeof subscription).toBe('string')
  })
})