const request = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../app')
const fs = require('fs/promises')
const { User, newUser } = require('../model/__mocks__/data')
require('dotenv').config()

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const issueToken = (payload, secret) => jwt.sign(payload, secret)
const token = issueToken({ id: User.id }, JWT_SECRET_KEY)
User.token = token

jest.mock('../model/contacts.js')
jest.mock('../model/users.js')
// jest.nock('cloudinary')

// // for cloudinary
// describe('Testing the route api/users', () => {
//     describe('should handle PATCH request', () => {
//         test('should return 200 status for PATCH: /users/avatars', async (done) => {
//             const buffer = await fs.readFile('./test/1604852802046.jpg')
//             const res = await request(app)
//                 .patch('/api/users/avatars')
//                 .set('Authorization', `Bearer ${token}`)
//                 .attach('avatar', buffer, '1604852802046.jpg')
//             expect(res.status).toEqual(200)
//             expect(res.body).toBeDefined()
//             expect(res.body.data.avatarUrl).toBeEqual('secure_url_cloudinary')
//             done()
//         })
//     })
// })


//Have to improve
// describe('Testing the route api/users', () => {
//     describe('should handle PATCH request', () => {
//         test('should return 200 status for PATCH: /users/avatars', async (done) => {
//             const buffer = await fs.readFile('./test/1604852802046.jpg')
//             const res = await request(app)
//                 .patch('/api/users/avatars')
//                 .set('Authorization', `Bearer ${token}`)
//                 .attach('avatar', buffer, '1604852802046.jpg')
//             expect(res.status).toEqual(200)
//             expect(res.body).toBeDefined()
//             expect(res.body.data.avatarUrl).toBeEqual('avatars/Date.now().toString()-1604852802046.jpg');
//             done()
//         })
//     })
// })