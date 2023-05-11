/* eslint-disable no-undef */
const request = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const app = require("../../app");
const { User } = require("../../models");
const { DB_HOST } = process.env;

// create user for testing
const testUser = {
  email: "desheviyhasl@gmail.com",
  password: "q1qazsw2",
  subscription: "pro",
};

// create paths for sending request to MongoDB
const pathLogin = "/api/auth/login";
const pathCurrentUser = "/api/auth/current";

describe("TEST: Login controller", () => {
  // define two global variables that will be used later in different tests
  let token;
  let user;

  // the Jest hook that runs before all the tests
  beforeAll(async () => {
    // connecting to MongoDB
    await mongoose.connect(DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // creating a new user from testUser
    user = new User({
      email: testUser.email,
      password: await bcrypt.hash(testUser.password, 10), // hash the password using the same rules like a Login controller
      subscription: testUser.subscription,
    });
    await user.save(); // store the user object
  });

  // the Jest hook that runs after all the tests.
  afterAll(async () => {
    await User.deleteMany({ email: testUser.email }); // delete test user from the database
    await mongoose.disconnect(); // disconnect from the database
  });

  // First test
  test("the response must return a token with a status code of 200 when email and password are valid ", async () => {
    const response = await request(app)
      .post(pathLogin) // POST request to the login endpoint
      .send({ email: testUser.email, password: testUser.password }) // send test user's email and password
      .expect(200); // expects a response with status 200

    expect(response.body).toHaveProperty("token"); // check that the response has a token
    token = response.body.token; // store the token in global token variable which was defined above for use in the next test case.
  });

  // Second test
  test("the response must return the user object with email and subscription when a token is valid", async () => {
    const response = await request(app)
      .get(pathCurrentUser) // GET request to the endpoint of current user
      .set("Authorization", `Bearer ${token}`) // // send token from global token variable
      .expect(200); // expects a response with status 200

    expect(response.body).toHaveProperty("email", user.email); // check that the response has a email
    expect(response.body).toHaveProperty("subscription", user.subscription); // // check that the response has a subscription
  });

  // Third test - password is invalid
  test("the response must return an error 401 when password is invalid", async () => {
    const response = await request(app)
      .post(pathLogin)
      .send({ email: testUser.email, password: "111111111111" }) // send user with wrong password
      .expect(401); // expect a response with status 401

    // check that the response body has the error message which was defined in original code
    expect(response.body).toHaveProperty(
      "message",
      "Password is incorrect. Please check"
    );
  });

  // Fourth test - user is not found
  test("the response must return an error 401 when email are invalid", async () => {
    const response = await request(app)
      .post(pathLogin)
      .send({ email: "wronguser@gmail.com", password: testUser.password })
      .expect(401);

    expect(response.body).toHaveProperty(
      "message",
      "User is not found. Please check email"
    );
  });

  // Fifth test - email or password is missing
  test("the response must return an error 400 when email or password is missing", async () => {
    const response = await request(app).post(pathLogin).send({}).expect(400);

    expect(response.body).toHaveProperty("message", '"password" is required');
  });

  // Sixth test - token is invalid
  test("the response must return 401 error code when an token is invalid", async () => {
    const response = await request(app)
      .get("/api/auth/current")
      .set("Authorization", "Bearer invalidToken")
      .expect(401);

    expect(response.body).toHaveProperty("message", "The token is invalid");
  });
});
test("the response must return 305 compite when den token is valid", async() => {
  const response = await request(app)
  .get("/api/auth/current")
  .set("Authorization", "Fox validToken")
  .expect(305);
  expect(response.body).toHaveProperty("message", "The token is valid");
});
