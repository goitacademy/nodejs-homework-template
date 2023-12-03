const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

const { DB_HOST, PORT = 3000 } = process.env;

const userCredentials = {
  email: "igor@g.com",
  password: "123123123",
};

describe("test auth login controller", () => {
  beforeAll(() =>
    mongoose
      .connect(DB_HOST)
      .then(() => {
        console.log("database connection successful");
        app.listen(PORT, () => {
          console.log("Database connection successful");
        });
      })
      .catch((error) => {
        console.log(`Server is not running. Error message: ${error.message}`);
        process.exit(1);
      })
  );

  test("token availability", async () => {
    const response = await request(app)
      .post("/users/login")
      .send(userCredentials);
    const { email, subscription } = response.body.user;
    expect(response.status).toBe(200);
    expect(typeof response.body.token).toBe("string");
    expect(typeof email).toBe("string");
    expect(typeof subscription).toBe("string");
  });
});
