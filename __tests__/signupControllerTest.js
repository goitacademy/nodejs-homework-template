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
