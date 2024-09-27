const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../../app");
const { User } = require("../../models");

const { DB_HOST_TEST, PORT = 3000 } = process.env;

describe("test /api/users/register route", () => {
  let server = null;
  beforeAll(async () => {
    server = app.listen(PORT);
    await mongoose.connect(DB_HOST_TEST);
  });

  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });

  beforeEach(() => {});

  afterEach(async () => {
    await User.deleteMany({});
  });

  it("test register route with correct data", async () => {
    const registerData = {
      name: "Bogdan",
      email: "bogdan@gmail.com",
      password: "123456",
      subscription: "starter",
    };

    const res = await request(app)
      .post("/api/users/register")
      .send(registerData);

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe(registerData.name);
    expect(res.body.email).toBe(registerData.email);

    const user = await User.findOne({ email: registerData.email });
    expect(user.name).toBe(registerData.name);
  }, 10000);
    
});