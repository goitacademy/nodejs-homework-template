import supertest from "supertest";
import { dbConnection, dbDisconect } from "../server.js";
import { app } from "../app.js";
import { User } from "../service/schemas/User.js";
import { response } from "express";
describe("Users controller", () => {
  beforeAll(() => dbConnection(process.env.DB_HOST));

  test("login user", async () => {
    const response = (await supertest(app).post("/api/users/login"))
      .send({
        email: "somethingnew@gmail.com",
        password: "costam",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(response.statusCode)
      .toEqual(200);
  });

  afterAll(async () => {
    await dbDisconect();
  });
});
