const { signup } = require("../services/authService");
const jwt = require("jsonwebtoken");
const { User } = require("../db/userModel");

describe("Signup Controller test", () => {
  it("shoud return user date with two fields mail and subscription", async () => {
    const mEmail = "bla@gmail.com";
    const mPassword = "1111111";

    const user = new User({ mEmail, mPassword });

    const result = await signup(mEmail, mPassword);

    expect(result.email).toEqual(mEmail);
    expect(result.password).toEqual(mPassword);
  });
});

// Картинки грузяться як треба. Тести це не для джунів :slightly_smiling_face:
// Купа варіантів як писати
// Наприклад так
// const { loginController } = require(" шлях до authController");
// test("Login test", async () => {
//   const mReq = { body: { email: "avatar@email.com", password: "avatar" } };
//   const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
//   await loginController(mReq, mRes);
//   expect(mRes.status).toBeCalledWith(200);
//   expect(mRes.token).toEqual(expect.anything());
//   expect(mRes.user.email).toEqual(expect.not.stringContaining(expected));
//   expect(mRes.send.user.password).toEqual(
//     expect.not.stringContaining(expected)
//   );
// });
