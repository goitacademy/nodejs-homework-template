const cathAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/usersModel");
const {
  registerUserDataValidator,
  loginUserDataValidator,
} = require("../utils/contactsValidator");

// CHECK USER REGISTRATION DATA
exports.checkRegistrUserData = cathAsync(async (req, res, next) => {
  if (!req.body.email) throw new AppError(400, "Email is required");
  if (!req.body.password) throw new AppError(400, "Password is required");

  const { error, value } = registerUserDataValidator(req.body);
  if (error) {
    console.log(error);
    throw new AppError(400, "Invalid user data (Joi)..");
  }

  const userExists = await User.exists({ email: value.email });

  if (userExists) throw new AppError(409, "Email in use");

  next();
});

// CHECK USER LOGIN DATA
exports.checkLoginUserData = cathAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) throw new AppError(400, "Email is required");
  if (!password) throw new AppError(400, "Password is required");

  const { error, value } = loginUserDataValidator(req.body);
  if (error) {
    console.log(error);
    throw new AppError(400, "Invalid user data (Joi)..");
  }

  req.body = value;

  next();
});
