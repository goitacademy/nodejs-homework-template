// const { MongoClient } = require("mongodb");
// const request = require("supertest");
// const app = require("./auth"); // Assuming your Express app is in "app.js"
// const User = require("../models/user"); // Import the User model

// describe("login function", () => {
//   let connection;
//   let db;

//   beforeAll(async () => {
//     connection = await MongoClient.connect(global.__MONGO_URI__, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     db = await connection.db(global.__MONGO_DB_NAME__);
//     User.db = db; // Set the database for the User model
//   });

//   afterAll(async () => {
//     await connection.close();
//     await db.close();
//   });

//   it("should log in a user and return a token", async () => {
//     const user = {
//       email: "asd9@gmail.com",
//       password: "12345678",
//     };

//     // Insert a user into the test database
//     await db.collection("users").insertOne(user);

//     // Perform a mock request to the login endpoint
//     const response = await request(app.login).post("/login").send(user);

//     // Assertions
//     expect(response.statusCode).toBe(200);
//     expect(response.body).toHaveProperty("token");
//   });

//   it("should return an error for invalid credentials", async () => {
//     const invalidUser = {
//       email: "nonexistent@example.com",
//       password: "invalidpassword",
//     };

//     // Perform a mock request to the login endpoint
//     const response = await request(app).post("/login").send(invalidUser);

//     // Assertions
//     expect(response.statusCode).toBe(401);
//     expect(response.body).toHaveProperty(
//       "message",
//       "Email or password invalid"
//     );
//   });
// });
