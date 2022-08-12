// const { loginController } = require("../controllers/auth");

// describe("Login Controller test", () => {
//   test("Login test", async () => {
//     const mReq = { body: { email: "avatar@email.com", password: "avatar" } };
//     const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
//     await loginController(mReq, mRes);
//     expect(mRes.status).toBeCalledWith(200);
//     expect(mRes.token).toEqual(expect.anything());
//     expect(mRes.user.email).toEqual(expect.not.stringContaining(expected));
//     expect(mRes.send.user.password).toEqual(
//       expect.not.stringContaining(expected)
//     );
//   });
// });
