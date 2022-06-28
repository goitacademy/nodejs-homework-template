// const isAuth = require("../middlewares/isAuth");
// const { createError } = require("../helpers");
// // const jwt = require("jsonwebtoken");
// require("dotenv").config();

// describe("Auth middleware test", () => {
//   // success test
//   it("should call next() and add user properties to req object", () => {
//     const user = {
//       _id: "62b9897e07caf4345d29c049",
//       password: "$2a$10$E1YIyVSUErO4N0MzX.fF4OdFhnRvcCNMhFMsa0lOIE.aPK",
//       email: "example@mail.com",
//       subscription: "pro",
//       token:
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjk4OTdlMDdjYWY0N2QyZDI5YzA0OSIsImlhdCI6MTY1NjMyNjU2NCwiZXhwIjoxNjU2MzY5NzY0fQ.asjHYHIXsKpFMhsJqICas9qEFriAQhe9x4b3whVN5b4",
//       createdAt: new Date().getTime(),
//       updatedAt: new Date().getTime(),
//       avatarURL: "avatars/62b9897e07caf4345d29c049.jpeg",
//     };
//     const mReq = {
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     };
//     const mRes = {};
//     const mockNext = jest.fn();
//     isAuth(mReq, mRes, mockNext);

//     expect(mReq.token).toEqual(token);
//     expect(mReq.user._id).toEqual(user._id);
//     expect(mockNext).toHaveBeenCalled();
//   });

//   // authorization header does not include "Bearer"
//   // authorization does not include "Bearer"
//   // cannot find user with this ID in the DB
//   // user from the DB does not have a token
//   it("should call next() with error in case authorization header is absent", () => {
//     const user = {
//       _id: "62b9897e07caf4345d29c049",
//       password: "$2a$10$E1YIyVSUErO4N0MzX.fF4OdFhnRvcCNMhFMsa0lOIE.aPK",
//       email: "example@mail.com",
//       subscription: "pro",
//       token:
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjk4OTdlMDdjYWY0N2QyZDI5YzA0OSIsImlhdCI6MTY1NjMyNjU2NCwiZXhwIjoxNjU2MzY5NzY0fQ.asjHYHIXsKpFMhsJqICas9qEFriAQhe9x4b3whVN5b4",
//       createdAt: new Date().getTime(),
//       updatedAt: new Date().getTime(),
//       avatarURL: "avatars/62b9897e07caf4345d29c049.jpeg",
//     };
//     const mReq = {
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     };
//     const mRes = {};
//     const mockNext = jest.fn();
//     isAuth(mReq, mRes, mockNext);

//     expect(mReq.token).toEqual(token);
//     expect(mReq.user._id).toEqual(user._id);
//     expect(mockNext).toHaveBeenCalledWith(new createError(401));
//   });
// });
