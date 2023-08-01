/**
 * function logIn returns an Object res.
 * @param {*} req  - is Object with properties email, password
 * @param {*} res  - is Object with structure:
 * {token - is String,
    user: { email - is String, subscription - is String, avatarURL - is String},
  }}
 */

const { logIn } = require("./auth");

const desiredRes = {
  token: expect.any(String),
  user: {
    email: expect.any(String),
    subscription: expect.any(String),
    avatarURL: expect.any(String),
  },
};

describe("test logIn function", () => {
  test("result  - is an Object with expected properties", async () => {
    const result = await logIn(
      (req = { body: { email: "iryna@gmail.com", password: "1234" } }),
      (res = {})
    );
    expect(result).toMatchObject(desiredRes);
  }, 1000000);
});
