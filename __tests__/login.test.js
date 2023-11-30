/* 
1. Response must have status 200
2. Response must return the token
3. Response must return an object with 2 fields: "email" & "subscription" with type of data String
*/

import app from "../app.js";
import request from "supertest";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

const { DB_HOST, PORT = 3000 } = process.env;
const testLogin = {
  email: "test@mail.com",
  password: "qweqwe",
};

mongoose.set("strictQuery", true);

describe("POST users/login test", () => {
  beforeAll(async () => {
    try {
      await mongoose.connect(DB_HOST);
      app.listen(PORT);
    } catch (error) {
      process.exit(1);
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  let response;

  beforeEach(async () => {
    response = await request(app).post("/users/login").send(testLogin);
  });

  it("Should return statusCode 200", async () => {
    expect(response.status).toBe(200);
  });
});
