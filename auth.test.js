// __tests__/auth.test.js
const request = require("supertest");
const { app, startServer } = require("./app"); // Asegúrate de que la ruta sea correcta
const {
  CONNECTION_MONGODB,
  USEREMAIL,
  USERPASSWORD,
} = require("./utils/variables");

const mongoose = require("mongoose");
// const User = require('./models/contacts').User;
require("dotenv").config();

beforeAll(async () => {
  await mongoose.connect(CONNECTION_MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await startServer();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST /api/auth/signup", () => {
  test("should return 201 with token and user object", async () => {
    const randomEmail = `testuser${Date.now()}@example.com`;
    const response = await request(app).post("/api/auth/signup").send({
      name: "Test User",
      email: randomEmail,
      password: "A123456.a",
    });
    //  console.log('Response body:', response.body);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("result");
    expect(response.body).toHaveProperty("message", "Signup successfully.");
    expect(response.body.result).toHaveProperty("token");
    expect(response.body.result).toHaveProperty("name");
    expect(response.body.result).toHaveProperty("_id");
    expect(response.body.result).toHaveProperty("email", randomEmail);
    expect(response.body.result).toHaveProperty("subscription");
  });
});

describe("POST /api/auth/log-in", () => {
  test("should return 200 with token and user object", async () => {
    const randomEmail = USEREMAIL;
    const response = await request(app).post("/api/auth/log-in").send({
      email: randomEmail,
      password: USERPASSWORD,
      active: true,
    });

    //    console.log('Response body:', response.body);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("result");
    expect(response.body).toHaveProperty("message", "Login successfully");
    expect(response.body.result).toHaveProperty("Token");
    expect(response.body.result).toHaveProperty("User");
    expect(response.body.result.User).toHaveProperty("_id");
    expect(response.body.result.User).toHaveProperty("email", randomEmail);
    expect(response.body.result.User).toHaveProperty("subscription");
  });
});

// Agrega más pruebas según sea necesario
