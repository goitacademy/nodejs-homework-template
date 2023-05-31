// Response has status 200.Response has token and object user with 2 keys:{email, subscription}.type string

const { login } = require("./auth");
describe("test login function", () => {
  test("response status 200", () => {
    const result = login({
      email: "avatar4@mail.com",
      password: "1234567",
    });
    expect(result.status).toBe(200);
  });
});
