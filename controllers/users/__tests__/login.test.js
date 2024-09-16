const requestData = require("supertest");
const app = require("../../../app");
const mongoose = require("mongoose");
const { DB_HOST, PORT = 5000 } = process.env;

connectDB = () => {
  mongoose.set("strictQuery", true);

  return mongoose
    .connect(DB_HOST)
    .then(() => {
      app.listen(PORT);
      console.log("Database connection successful");
    })
    .catch((error) => {
      console.log(error.message);
      process.exit(1);
    });
};

describe("login controller test", () => {
  beforeAll(async () => {
    await connectDB();
  });
  afterAll(() => {
    mongoose.disconnect();
  });

  test(" return status, jwt and an user object", async () => {
    const data = { email: "gogi@mail.com", password: "1234567" };

    const result = await requestData(app).post("/api/users/login").send(data);

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: expect.objectContaining({
          email: expect.any(String),
          subscription: expect.any(String),
        }),
      })
    );
  });
});
