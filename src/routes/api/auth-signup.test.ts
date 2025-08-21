import mongoose from "mongoose";
import { app } from "../../app";
import supertest from "supertest";

import User from "../../models/User";

const { DB_TEST_HOST, PORT } = process.env;

describe("test /users/signup", () => {
  let server: any = null;

  beforeAll(async () => {
    await mongoose.connect(DB_TEST_HOST!);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server?.close();
  });

  //   afterEach(async () => {
  //     await User.deleteMany();
  //   });

  test("test user/signin with true data", async () => {
    const signupData = {
      email: "testingsign@gmail.com",
      password: "1243747",
    };

    const { body, statusCode } = await supertest(app)
      .post("/users/signup")
      .send(signupData);

    expect(statusCode).toBe(201);
    expect(body.user.email).toBe(signupData.email);
    expect(body.user.subscription).toBe("starter");

    const user = await User.findOne({ email: signupData.email });

    expect(user?.email).toBe(signupData.email);
  });
});
