const mongoose = require("mongoose");

const app = require("../app");

const { DB_HOST_TEST, PORT } = process.env;

describe("test /api/users/login route", () => {
  let server = null;
  beforeAll(async () => {
    server = app.listen(PORT);
    await mongoose.connect(DB_HOST_TEST);
  });

  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });

  test("test login route with status code", async () => {
    const loginData = {
      email: "DolphiN@Gmail.com",
      password: "123456",
    };

    const res = await request(app).post("/api/users/login").send(loginData);
    expect(res.statusCode).toBe(200);
    expect({ token }).toBe(true);
  });
});
