// const mongoose = require("mongoose");
// const app = require("../app");
// const supertest = require("supertest");
// require("dotenv").config();
// const { DB_HOST } = process.env;

// beforeAll(async () => {
//   await mongoose.connect(DB_HOST, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// });

// mongoose.set("strictQuery", false);

// describe("login/signup controller", () => {
//   const credentials = {
//     email: "tatynamdr@gmail.com",
//     password: "Social6039",
//   };
//   test("Should create user", async () => {
//     const resSignup = await supertest(app)
//       .post("/api/users/signup")
//       .send(credentials);
//     expect(resSignup.statusCode).toBe(201);
//   });

//   test("Should return status code 200", async () => {
//     const resLogin = await supertest(app)
//       .post("/api/users/login")
//       .send(credentials);
//     expect(resLogin.statusCode).toBe(200);
//     expect(resLogin.body.data.token).toBeTruthy();
//     expect(typeof resLogin.body.data.user).toBe("object");
//     expect(typeof resLogin.body.data.user.email).toBe("string");
//     expect(typeof resLogin.body.data.user.subscription).toBe("string");
//   });

//   test("Should delete test user", async () => {
//     const resRemoveUser = await supertest(app).delete(
//       "/api/users?email=" + credentials.email
//     );
//     expect(resRemoveUser.statusCode).toBe(200);
//   });
// });

// afterAll(async () => {
//   await mongoose.connection.close();
// });