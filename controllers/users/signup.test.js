const signup = require("./signup");
const express = require("express");
const request = require("supertest");

const app = express();
app.post("/users/signup", signup);

describe("test is signup", () => {
  beforeAll(() => {
    app.listen(3000);
  });

  // afterAll(() => {
  //   app.close();
  // });
  test("Status: 201 OK", async () => {
    const result = await request(app).post("api/users/signup");
    expect(result.status).toBe(201);
  });
});
