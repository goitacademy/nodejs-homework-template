const supertest = require("supertest");
const app = require("../../server");
const userService = require("../../service/userService");
// const jest = require("@jest/globals");
const bcrypt = require("bcryptjs");

jest.spyOn(userService, "loginUser").mockResolvedValue({
  email: "test@test.pl",
  password: bcrypt.hashSync("test1234", 10),
  subscription: "starter",
});
jest.spyOn(userService, "updateToken").mockResolvedValue(true);

describe("Login controller", () => {
  it("Should return 200 and token for valid credentials", async () => {
    const res = await supertest(app)
      .post("/users/login")
      .send({ email: "test@test.pl", password: "test1234" });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.token).toBeDefined();
    expect(res.body.data.user).toEqual({
      email: "test@test.pl",
      subscription: "starter",
    });
  });
});
