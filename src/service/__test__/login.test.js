/*
1. Передаємо данні (password, email)для регістрації
2. return 201 при успішній регістрації
*/


const request = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

const { DB_HOST, PORT = 3000 } = process.env;
const app = require("../../app");
let server;
beforeAll((done) => {
  mongoose.connect(DB_HOST).then(() => (server = app.listen(PORT, done)));
});

afterAll((done) => {
  server.close(done);
});
// afterAll(async () => {
//   await new Promise(resolve => setTimeout(() => resolve(), 10000)); // avoid jest open handle error
// });
describe("test login routes", () => {
  test("test send login ", async () => {
    const loginUser = {
      password: "1234567",
      email: "vikto@gmail.com",
    };

    const response = await request(app)
      .post("/api/auth/login")
      .send(loginUser);

    const { user, token } = response.body
  

    expect(response.statusCode).toBe(200);
    expect(token).toBeTruthy();
    expect(user).toBeDefined();
    expect(typeof user.email).toBe("string");
    expect(typeof user.subscription).toBe("string");
  });
});






//* test for test
// describe('Sample Test', () => {
//   it('should test that true === true', () => {
//     expect(true).toBe(true)
//   })
// })
//*                                              //

// const { authVerifyToken } = require("../../middleware");
// const jwt = require("jsonwebtoken");
// const { SECRET_KEY } = process.env;
// jest.mock('./signup.jest.test.js')
// jest.mock('../../middleware');


/*
1. Передаємо данні (password, email)для регістрації
2. return 201 при успішній регістрації 
*/


// const  signup  = require("../../controllers");
// require("dotenv").config();
// const { User } = require("../../models");

// describe("Signup test", () => {
//   it("should add user  and response status 201",  () => {
//     const mReq = {
//       body: {
//         email: "email1@ukr.net",
//         password: "1111111",
//       },
//     };
//     const mRes = { status: jest.fn() };

//     const mUser = {
//       email: "email1@ukr.net",
//       subscription: "starter",
//     };


    
//     jest.spyOn(User, "findOne").mockImplementationOnce( () => (mUser));

//     const result = signup(mReq, mRes);
//     expect(result.status).toEqual(201);
//     // expect(result.status).toBe(true);

//     // expect(mRes.status).lastCalledWith(201);
//   });
// });
