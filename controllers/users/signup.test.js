const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
const { DB_HOST, PORT = 4444 } = process.env;
const random = Math.floor(Math.random() * 10000000);

describe("test signup", () => {
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
  test("signup returns response status 201 and response body must contain name, email and subscription type", async () => {
    const response = await request(app)
      .post("/api/users/signup")
      .send({
        email: `newuser${random}@newuser.net`,
        password: `newuser${random}`,
        subscription: "pro",
      });
    const { _id, email, password, subscription, avatarURL } = response.body;
    expect(typeof response.body).toBe("object");
    expect(response.status).toBe(201);
    expect(typeof _id).toBe("string");
    expect(typeof email).toBe("string");
    expect(typeof password).toBe("string");
    expect(typeof subscription).toBe("string");
    expect(typeof avatarURL).toBe("string");
    expect(response.body).toHaveProperty("token", null);
  });
});
