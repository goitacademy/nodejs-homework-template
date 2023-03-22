// const { Types } = require("mongoose");

// const { catchAsync } = require("../utils/index");

// const checkContactId = catchAsync(async (req, res, next) => {
//   const { id } = req.params;

//   const idIsValid = Types.ObjectId.isValid(id);

//   if (!idIsValid) return next(new AppError(404, "User does not exist"));

//   const userExists = await User.exists({ _id: id });

//   if (!userExists) {
//     return next(new AppError(404, "User does not exist"));
//   }

//   next();
// });

// module.exports = { checkContactId };
