const request = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const app = require("../../app");
const { User } = require("../../models/user");
const { DB_HOST } = process.env;

/*
testing login :

- valid { email: "testuser@gmail.com", password: "123456", } - { statusCode: 200, token} 
- set valid {token} - {email, subscription}
- no valid password {email: "testuser@gmail.com", password: "1234567777",} - {statusCode: 401, message: "Email or password is wrong"}
- no valid email {email: "wronguser@gmail.com", password: "123456",} - {statusCode: 401, message: "Email or password is wrong"}
-{email: "", password: "",} - {statusCode: 400, message: ""password" is required"}
- set no valid {token} - {statusCode: 401, message: "Unauthorized"}
*/

const testUser = {
  email: "testuser@gmail.com",
  password: "123456",
};

const avatarURL = gravatar.url(testUser.email);

const pathLogin = "/api/auth/login";
const pathCurrentUser = "/api/auth/current";

describe("Testing Login controller", () => {
  let token;
  let user;

  beforeAll(async () => {
    await mongoose.connect(DB_HOST);

    user = new User({
      email: testUser.email,
      password: await bcrypt.hash(testUser.password, 10),
      avatarURL,
    });
    await user.save();
  });

  afterAll(async () => {
    await User.deleteMany({ email: testUser.email });
    await mongoose.disconnect();
  });

  test("the response must return a token with a status code 200", async () => {
    const response = await request(app)
      .post(pathLogin)
      .send({ email: testUser.email, password: testUser.password })
      .expect(200);

    expect(response.body).toHaveProperty("token");
    token = response.body.token;
  });

  test("the response must return the user object with email and subscription when a token is valid", async () => {
    const response = await request(app)
      .get(pathCurrentUser)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body).toHaveProperty("email", user.email);
    expect(response.body).toHaveProperty("subscription", user.subscription);
  });

  test("the response must return an error 401 when password is invalid", async () => {
    const response = await request(app)
      .post(pathLogin)
      .send({ email: testUser.email, password: "1234567777" })
      .expect(401);

    expect(response.body).toHaveProperty(
      "message",
      "Email or password is wrong"
    );
  });

  test("the response must return an error 401 when email are invalid", async () => {
    const response = await request(app)
      .post(pathLogin)
      .send({ email: "wronguser@gmail.com", password: testUser.password })
      .expect(401);

    expect(response.body).toHaveProperty(
      "message",
      "Email or password is wrong"
    );
  });

  test("the response must return an error 400 when email or password is missing", async () => {
    const response = await request(app).post(pathLogin).send({}).expect(400);

    expect(response.body).toHaveProperty("message", '"password" is required');
  });

  test("the response must return 401 error code when an token is invalid", async () => {
    const response = await request(app)
      .get(pathCurrentUser)
      .set("Authorization", "Bearer invalidToken")
      .expect(401);

    expect(response.body).toHaveProperty("message", "Unauthorized");
  });
});
