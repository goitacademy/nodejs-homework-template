// import User from "../service/schemas/users.js";
// import { login } from "../controller/users.js";
// import jwt from "jsonwebtoken";
// import "dotenv/config";
// import { jest } from "@jest/globals";

// const secret = process.env.JWT_SECRET;

// const mockRequest = (body) => ({
//   body,
// });

// const mockResponse = () => {
//   const res = {};
//   res.status = jest.fn().mockReturnValue(res);
//   res.json = jest.fn().mockReturnValue(res);
//   return res;
// };

// jest.mock("jsonwebtoken", () => ({
//   sign: jest.fn().mockReturnValue("mockedToken"),
// }));

// jest.mock("../service/schemas/users.js", () => ({
//   User: {
//     find: jest.fn(),
//     findOne: jest.fn(),
//     save: jest.fn(),
//   },
// }));

// describe("login", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it("should return status 400 if request body is missing", async () => {
//     const req = mockRequest(null);
//     const res = mockResponse();

//     await login(req, res);

//     expect(res.status).toHaveBeenCalledWith(400);
//     expect(res.json).toHaveBeenCalledWith(
//       "Error! Missing fields! Empty request is not allowed"
//     );
//   });

//   it("should return status 400 and error message for wrong email or password", async () => {
//     const req = mockRequest({
//       email: "nonexistent@example.com",
//       password: "wrongpassword",
//     });

//     const res = mockResponse();

//     try {
//       await login(req, res);
//     } catch (error) {
//       console.error("Error in login function:", error);
//     }

//     // expect(res.status).toHaveBeenCalledWith(400);
//     expect(res.json).toHaveBeenCalledWith("Error! Email or password is wrong!");
//   }, 20000);

//   it("should return status 200, token, and user object for valid login", async () => {
//     const req = mockRequest({
//       email: "user@example.com",
//       password: "validpassword",
//     });
//     const res = mockResponse();

//     const userMock = {
//       id: "mockUserId",
//       email: "user@example.com",
//       subscription: "free",
//     };
//     jest.spyOn(userMock, "validPassword").mockReturnValue(true);

//     const findMock = jest.fn().mockReturnValue([userMock]);
//     const findOneMock = jest.fn().mockReturnValue(userMock);

//     User.find = findMock;
//     User.findOne = findOneMock;

//     await login(req, res);

//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(jwt.sign).toHaveBeenCalledWith(
//       { id: userMock.id, username: userMock.email },
//       secret,
//       { expiresIn: "1h" }
//     );
//     expect(userMock.token).toEqual("mockedToken");
//     expect(userMock.save).toHaveBeenCalled();
//     expect(res.json).toHaveBeenCalledWith({
//       status: "success",
//       code: 200,
//       token: "mockedToken",
//       user: {
//         email: userMock.email,
//         subscription: userMock.subscription,
//       },
//     });
//   });
// });
