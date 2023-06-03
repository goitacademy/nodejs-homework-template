const axios = require("axios");
const url = "http://localhost:3000/users";

describe("Login", () => {
  test("should login existing user", async () => {
    const res = await axios.post(`${url}/login`, {
      email: "example@mail.com",
      password: "123456",
    });

    expect(res).toBeTruthy();
    expect(res.status).toBe(200);
    expect(res.data).toMatchObject({
      token: expect.any(String),
      user: expect.objectContaining({
        email: expect.any(String),
        subscription: expect.any(String),
      }),
    });
  });

  test("should not login nonexisting user", async () => {
    try {
      await axios.post(`${url}/login`, {
        email: "example1@mail.com",
        password: "123456",
      });
    } catch (error) {
      expect(error.response.status).toBe(401);
      expect(error.message).toEqual("Request failed with status code 401");
    }
  });
});
