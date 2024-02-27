const app = require("../app");
const mongoose = require("mongoose");
const request = require("supertest");

require("dotenv").config();
const PORT = process.env.PORT || 3002;
const URI_DB = process.env.DB_HOST;

describe("Testing login function", () => {
  let server;

  beforeEach(() => {
    mongoose.connect(URI_DB).then(() => {
      console.log("Database connection successful");
      server = app.listen(PORT, function () {
        console.log(`Server running. Use our API on port: ${PORT}`);
      });
    });
  });

  afterEach(() => {
    server.close();
  });

  test("/users/login", async () => {
    const user = {
      email: "emma@hello.com",
      password: "MyCreativePassword",
    };

    const resp = await request(app).post("/users/login").send(user);
    expect(resp.status).toBe(200);

    const token = resp.body.token;
    expect(token).toBeTruthy();

    const userObject = resp.body.user;
    expect(typeof userObject).toBe("object");

    const userData = Object.keys(userObject);
    expect(userData.length).toBe(2);
    expect(userData).toContain("email");
    expect(typeof userObject.email).toBe("string");
    expect(userData).toContain("subscription");
    expect(typeof userObject.subscription).toBe("string");
  }, 15000);
});
