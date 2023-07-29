const login = require("./login");
const ctrlWrapper = require("../../helpers/ctrlWrapper");

describe("test login function", function () {
  test("should return status code 200 when login is successful", async () => {
    const email = "testing@vestibul.co.uk";
    const password = "123456";
    const token = "fake_token";

    const req = {
      email,
      password,
    };

    const res = {
      json: jest.fn(() => {
        expect(res.json).toHaveBeenCalledWith({
          token,
          user: {
            email: user.email,
            subscription: user.subscription,
          },
        });

        expect(res.statusCode).toBe(200);
      }),
    };

    const next = jest.fn();

    const wrappedLogin = ctrlWrapper(login);

    await wrappedLogin(req, res, next);
  });
});
