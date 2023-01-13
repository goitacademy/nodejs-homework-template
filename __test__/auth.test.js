// const { login } = require("../controllers/authController");
// const jwt = require("jsonwebtoken");
// // const bcrypt = require("bcryptjs");
// require("dotenv").config();
// const { User } = require("../db/UserModel");

// describe("Login service test", function () {
//   test("should return user data and token", async () => {
//     const user = { _id: "1", email: "qqq@mail.com", subscription: "starter" };
//     const { SECRET_KEY } = process.env;
//     const payload = {
//       id: user._id,
//     };

//     const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
//     const mReq = { body: { email: "qqq@mail.com", password: "123456" } };
//     const mRes = {
//       status: "200",
//       token: token,
//       user,
//     };

//     jest.spyOn(User, "findOne").mockImplementationOnce(() => mRes);
//     const result = await login(mReq, mRes);

//     expect(result.status).toEqual(mRes.status);
//     expect(result.token).toEqual(mRes.token);
//     expect(result.user.subscription).toEqual(mRes.user.subscription);
//     expect(result.user.email).toEqual(mRes.user.email);
//   });
// });
