const mongoose = require("mongoose");
const request = require("supertest");
const bcrypt = require("bcrypt");

const app = require("../../app");
const { User } = require("../../models/user");
const { DB_HOST_TEST, PORT } = process.env;

describe("test routes", () => {
  let server = null;
  beforeAll(async () => {
    server = app.listen(PORT);
    await mongoose.connect(DB_HOST_TEST);
  });
  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });
  afterEach(async () => {
    await User.deleteMany({});
  });

  test("test login route", async () => {
    const password = await bcrypt.hash("123456", 10);
    const newUser = {
      name: "Test5",
      email: "test5@test.com",
      password: `${password}`,
      subscription: "starter",
      avatarURL: "avatars\\652d2c213a12a6adac14f6c3_avatar.jpg"
    };
    const user = await User.create( newUser );
    const loginUser = {
      email: "test5@test.com",
      password: "123456",      
    };

    const res = await request(app).post("/api/auth/login").send(loginUser);
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeTruthy();
    const { token } = await User.findById(user._id);
    expect(res.body.token).toBe(token);
    expect(res.body.user).toHaveProperty("email");
    expect(res.body.user).toHaveProperty("subscription");
    expect(typeof res.body.user.email).toBe("string");
    expect(typeof res.body.user.subscription).toBe("string");
  });  
});
