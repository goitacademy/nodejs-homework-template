import { signup } from "./signup.js";
import { signupUser } from "../services/auth.helpers.js";

const fakeUserDb = [
  {
    id: "simpleId",
    email: "example@example.com",
    password: "password",
    subscription: "pro",
    token: null,
  },
  {
    id: "fakeId",
    email: "example2@example.com",
    password: "password",
    subscription: "pro",
    token: null,
  },
];

describe("This tests set will test signup funcion", function () {
  test("Should be succesfull when email and password are provided.", async function () {
    const newUser = {
      id: "newFakeID",
      email: "newEmail@gmail.com",
      password: "newpassword",
      subscription: "starter",
    };
    const req = {
      email: "newEmail@gmail.com",
      password: "newpassword",
    };
    const res = {
      json: jest.fn(),
      status: jest.fn.mockReturnThis(),
    };
    signupUser = jest.fn().mockResolvedValue(newUser);

    await signup(req, res, (next = {}));

    expect(signupUser).toHaveBeenCalledWith(req);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(newUser);
  });

  //   test("Should return an error when email is in use.", function () {});

  //   test("Should return an error when only email or password are provided", function () {});
});
