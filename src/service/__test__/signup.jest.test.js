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

const { signup } = require("../../controllers");
require("dotenv").config();
const { User } = require("../../models");

describe("Signup test", () => {
  it("should add user and response status 201", async () => {
    const mReq = {
      body: {
        email: "email1@ukr.net",
        password: "111111",
      },
    };
    const mRes = { status: jest.fn() };

    const mUser = {
      email: "email1@ukr.net",
      subscription: "starter",
    };
    jest.spyOn(User, "findOne").mockImplementationOnce(async () => mUser);

    const result = await signup(mReq, mRes);
    expect(result.status).toBe(201);
  });
});






// await signup(mReq, mRes);
// expect(mRes.status).lastCalledWith(201);
// expect(mRes.status).toBe(201);

// const token = jwt.sign(
//   {
//     id: user._id,
//   },
//   SECRET_KEY
// );
// mRes={status: jest.fn()}
// const mReq = {
//   headers: {
//     authorization: `Bearer ${token}`,
//   },
// };
// const mockNext = jest.fn();
// expect(mReq.token).toEqual(token);
// expect(mReq.user._id).toEqual(user._id);
// expect(mRes.statusCode).toBe(200);
// expect(mockNext).toHaveBeenCalled()

// export default {
//   authorize: () => {
//     return 'token';
//   },
// };

// });

// });

// import {describe, expect,  it} from '@jest/globals';
// const { signup } = require('../../controllers');
// // const  User  = require("../../models/index");

// describe("User signup", () => {
//   it("successful signup",  () => {

//     const input = {
//              email: "bencampbell@hotmail.com",
//              password: "super-secure-password",
//             };

//             expect(signup(input)).toEqual({
//                   name: "smith",
//                   email: "smith@test.com",
//                   password: "super-secure-password",
//                   subscription: "starter"});

//   });
// });

// describe("User signup", () => {
//   it("successful signup", async () => {
//     const response = await request(app)
//       .post("/auth/signup")
//       .send({
//         // name: "Ben Campbell",
//              email: "bencampbell@hotmail.com",
//              password: "super-secure-password",

//             //  subscription: "starter"
//             })
//       .expect(201); // success - user created

//     expect(response.get("Set-Cookie")).toBeDefined();
//   });
// it("should create a new user", () => {
//   const user1 = new User("smith", "smith@test.com");

//   expect(user1).toEqual({
//     name: "smith",
//     email: "smith@test.com",
//     subscription: "starter"

//   });
// });
// });
