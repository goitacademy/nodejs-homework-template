const User = require("../models/userModel");
const { catchAsync, userValidator, AppError } = require("../utils");

const checkRegisterUserData = catchAsync(async (req, res, next) => {
  const { error, value } = userValidator.registerUserValidation(req.body);

  if (error)
    return next(
      new AppError(
        400,
        error.details.map((item) => item.message)
      )
    );

  const userExists = await User.exists({ email: value.email });

  if (userExists)
    return next(
      new AppError(
        409,
        `Email in use. User with email=${value.email} already exists`
      )
    );

  req.body = value;
  next();
});

const checkLoginUserData = catchAsync(async (req, res, next) => {
  const { error, value } = userValidator.loginUserValidation(req.body);

  if (error)
    return next(
      new AppError(
        400,
        error.details.map((item) => item.message)
      )
    );


  req.body = value;
  next();
});

module.exports = {
  checkRegisterUserData,
  checkLoginUserData,
};
