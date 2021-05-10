const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const fs = require('fs/promises')
const {User, newUser} = require('../model/__mocks__/data');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const issueToken = (payload, secret) => jwt.sign(payload, secret);
const token = issueToken({id: User.id}, JWT_SECRET_KEY)
User.token = token;

jest.mock('../model/contacts.js')
jest.mock('../model/users.js')
jest.mock('cloudinary')

describe('Testing the routs api/users', () => {
  describe('Should handle PATCH request', () => {
    test('should return status 200  for POST: /users/avatars', async (done) => {
      const buffer = await fs.readFile('./public/avatars/female-avatar.jpg')
      // const buffer = await fs.readFile('./public/avatars/Vova2-avtr.png')
      const res = await request(app)
        .patch('/api/users/avatars')
        .set('Authorization', `Bearer ${token}`)
        .attach('avatar', buffer, 'female-avatar.jpg')
        // .attach('avatar', buffer, 'Vova2-avtr.png')
      expect(res.status).toEqual(200)
      expect(res.body).toBeDefined()
      expect(res.body.data.avatarUrl).toEqual ('secure_Url_Cloudinary')
      done()
    })
  })
})