const signup = require("./signup");
const express = require("express");
const request = require("supertest");

const app = express();
app.post("/users/login", signup);

describe("test is signup", () => {
  beforeAll(() => {
    app.listen(3000);
  });
  // afterAll(() => {
  //   app.exit(1);
  // });
  test("Status: 201 OK", async () => {
    const result = await request(app).post("/users/login");
    expect(result.status).toBe(201);
  });
});
