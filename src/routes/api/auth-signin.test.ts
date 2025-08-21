import mongoose from "mongoose";
import { app } from "../../app";
import supertest from "supertest";
import jwt from "jsonwebtoken";
import User from "../../models/User";

const { DB_TEST_HOST, JWT_SECRET_KEY } = process.env;

describe("test user/signin router", () => {
  let server: any = null;

  beforeAll(async () => {
    await mongoose.connect(DB_TEST_HOST!);
    server = app.listen(3001);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server?.close();
  });

  test("test user/signin with true data", async () => {
    const signinData = {
      email: "testingsign@gmail.com",
      password: "1243747",
    };

    const { body, statusCode } = await supertest(app)
      .post("/users/signin")
      .send(signinData);

    expect(statusCode).toBe(200);

    const isUserInDB = await User.findOne({
      email: signinData.email,
    });

    // const comparePassword = await bcrypt.compare(
    //   body.user.password,
    //   isUserInDB.password
    // );

    const payload = {
      id: isUserInDB?._id,
    };

    const token = jwt.sign(payload, JWT_SECRET_KEY!, {
      expiresIn: "20h",
    });

    await User.findByIdAndUpdate(isUserInDB?._id, { token });

    expect(body.user.email).toBe(signinData.email);
    expect(body.user.password).toBe(signinData.password);
    expect(token).toBe(body.user.token);
    expect(body.user.subscription).toBe("starter");
    expect(typeof signinData.email).toBe("string");
    expect(typeof body.user.subscription).toBe("string");
  });
});

// //* відповідь повина мати статус-код 200
// //* у відповіді повинен повертатися токен
// //* у відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String
