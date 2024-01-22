// const authController = require("../controllers/auth");
// const User = require("../models/user");
// const httpMocks = require("node-mocks-http");

// describe("Auth Controller - Login", () => {
//   const mockUser = {
//     _id: "65ae8d753bcbdaaa49fa7c9c",
//     email: "kirill2@gmail.com",
//     password: "$2b$10$8VzZOeYnEzE/hL0K8I3LMeO83UGlJqJgP25M4B8R1FG.SKGC2vOBm",
//     token:
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YWU4ZDc1M2JjYmRhYWE0OWZhN2M5YyIsImlhdCI6MTcwNTk0MzY5Nn0.RFqP9QDvZCIFiUUTO4oMEFWu6Yl9O1Dn3tfsvhXfBJA",
//   };

//   const mockRequest = {
//     body: {
//       email: "kirill2@gmail.com",
//       name: "Kyrylo",
//     },
//   };

//   const mockResponse = httpMocks.createResponse();

//   jest.spyOn(User, "findOne").mockResolvedValue(mockUser);

//   jest.spyOn(require("bcrypt"), "compare").mockResolvedValue(true);

//   jest
//     .spyOn(require("jsonwebtoken"), "sign")
//     .mockResolvedValue(
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YWU4ZDc1M2JjYmRhYWE0OWZhN2M5YyIsImlhdCI6MTcwNTk0MzY5Nn0.RFqP9QDvZCIFiUUTO4oMEFWu6Yl9O1Dn3tfsvhXfBJA"
//     );

//   it("should return user info and token on successful login", async () => {
//     await authController.login(mockRequest, mockResponse);

//     expect(mockResponse.statusCode).toBe(200);
//     expect(mockResponse._getJSONData()).toEqual({
//       user: {
//         email: "kirill2@gmail.com",
//         name: "Kyrylo",
//       },
//       token:
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YWU4ZDc1M2JjYmRhYWE0OWZhN2M5YyIsImlhdCI6MTcwNTk0MzY5Nn0.RFqP9QDvZCIFiUUTO4oMEFWu6Yl9O1Dn3tfsvhXfBJA",
//     });
//   });

//   afterAll(() => {
//     jest.restoreAllMocks();
//   });
// });
