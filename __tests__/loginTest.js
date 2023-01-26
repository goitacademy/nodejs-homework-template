const { loginController } = require("../src/controllers/auth/loginController");
const bcrypt = require("bcrypt");
const { User } = require("../src/db");

/* eslint-disable no-undef */
describe("Login controller test", () => {
  it("Valid login", async () => {
    const user = {
      _id: "qweqwe",
      email: "test@mail.com",
      password: await bcrypt.hash("qwe123", 10),
      subscription: "starter",
    };
    const mReq = {
      body: { email: "test@mail.com", password: "qwe123" },
    };
    let mRes = {
      json(qwe) {
        mRes = { ...mRes, ...qwe };
      },
    };

    jest.spyOn(User, "findOne").mockImplementationOnce(() => user);
    jest.spyOn(User, "findByIdAndUpdate").mockImplementationOnce(() => {
      "update token is done";
    });

    await loginController(mReq, mRes);
    expect(mRes.user.email).toEqual(user.email);
    expect(mRes.user.subscription).toEqual(user.subscription);
  });
});
