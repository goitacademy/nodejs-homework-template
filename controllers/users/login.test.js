const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
const { DB_HOST, PORT = 4000 } = process.env;

describe("test login", () => {
  beforeAll(async () => {
    try {
      await mongoose.disconnect();
      await mongoose.connect(DB_HOST);
      await app.listen(PORT);
    } catch (error) {
      console.log(error.message);
      process.exit(1);
    }
  });
  test("login returns response status 200, response body must object and contain a token ", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: "newuser@newuser.net",
      password: "newuser",
    });
    expect(typeof response.body).toBe("object");
    expect(typeof response.body.token).toBe("string");
    expect(response.status).toBe(200);
  });
});
