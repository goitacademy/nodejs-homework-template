// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("../../models/users");
// const HttpError = require("../../helpers/HttpError");
// const login = require("./login");

// jest.mock("bcrypt");
// jest.mock("jsonwebtoken");
// jest.mock("../../models/users");

// describe("Login Controller", () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it("should return token and user object with email and subscription fields", async () => {
//     const req = {
//       body: {
//         email: "test@example.com",
//         password: "password",
//       },
//     };

//     const user = {
//       _id: "user-id",
//       email: "test@example.com",
//       password: "hashed-password",
//     };

//     const token = "jwt-token";

//     User.findOne.mockResolvedValueOnce(user);
//     bcrypt.compare.mockResolvedValueOnce(true);
//     jwt.sign.mockReturnValueOnce(token);
//     User.findByIdAndUpdate.mockResolvedValueOnce();

//     const res = {
//       json: jest.fn(),
//     };

//     await login(req, res);

//     expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
//     expect(bcrypt.compare).toHaveBeenCalledWith("password", "hashed-password");
//     expect(jwt.sign).toHaveBeenCalledWith({ id: "user-id" }, process.env.SECRET_KEY, {
//       expiresIn: "1w",
//     });
//     expect(User.findByIdAndUpdate).toHaveBeenCalledWith("user-id", { token });
//     expect(res.json).toHaveBeenCalledWith({
//       token,
//     });
//   });

//   it("should throw an error if user is not found", async () => {
//     const req = {
//       body: {
//         email: "test@example.com",
//         password: "password",
//       },
//     };

//     User.findOne.mockResolvedValueOnce(null);

//     const res = {
//       json: jest.fn(),
//     };

//     expect(async () => {
//       await login(req, res);
//     }).rejects.toThrow(HttpError);

//     expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
//     expect(res.json).not.toHaveBeenCalled();
//   });

//   it("should throw an error if password is incorrect", async () => {
//     const req = {
//       body: {
//         email: "test@example.com",
//         password: "password",
//       },
//     };

//     const user = {
//       _id: "user-id",
//       email: "test@example.com",
//       password: "hashed-password",
//     };

//     User.findOne.mockResolvedValueOnce(user);
//     bcrypt.compare.mockResolvedValueOnce(false);

//     const res = {
//       json: jest.fn(),
//     };

//     expect(async () => {
//       await login(req, res);
//     }).rejects.toThrow(HttpError);

//     expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
//     expect(bcrypt.compare).toHaveBeenCalledWith("password", "hashed-password");
//     expect(res.json).not.toHaveBeenCalled();
//   });
// });