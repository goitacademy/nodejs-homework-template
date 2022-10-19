/** get foo register
 * if true:
 * should return:
 * status code 200
 * token
 * object with email and subscription
 * else :
 * false
 *pasword
 * 123 - error "pasword must be string"
 * ()=> - error "pasword must be string"
 * [] - error "pasword must be string"
 * {} - error "pasword must be string"
 *
 */

//  const mongoose = require('mongoose')
//  const request = require('supertest')
//  require("dotenv").config()

//  const app = require('../../app')
//  const {User} = require('../../models/user')

//  const {} = process.env

//  describe("", ()=>{
//     let server
//     afterAll(()=> server.close())

//     beforeEach((done)=>{

//     })

//     const loginUser = {
// email: "q@q",
// password: "1234"
//     }

//     const response = await request(app).post('/app/auth/login').send(loginUser)
//     exppect(response.statusCode).toBe(200)
//     const {body} = response
//     expect(body.token).toByTruthy()
//     const {token} = await User.findById(user._id)
//     expect(body.token).toBe(token)
//  })
