const { User } = require("../models");
const { jwtServices } = require("../services");
const userServices = require("./../models/userServices");

const { HttpError, catchAsync, validSchemas } = require("../addoption/");

// const checkToken = (token) => {
//   if (!token) throw HttpError(401, "Not authorized222");

//   try {
//     const { id } = jwt.verify(token, process.env.JWT_SECRET);

//     return id;
//   } catch (err) {
//     throw HttpError(401, "Not authorized111");
//   }
// };

exports.protect = catchAsync(async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer ") &&
    req.headers.authorization.split(" ")[1];

  const userId = jwtServices.checkToken(token);

  if (!userId) throw HttpError(401, "Not authorized");

  const currentUser = await User.findById(userId);

  if (!currentUser || !currentUser.token)
    throw HttpError(401, "Not authorized");

  req.user = currentUser;

  next();
});

exports.checkRegistrationData = catchAsync(async (req, res, next) => {
  const { value, error } = validSchemas.userValidSchema.validate(req.body);

  if (error) throw HttpError(400, error.message);

  await userServices.checkUserEmailExists({ email: value.email });

  req.body = value;

  next();
});

exports.checkLoginData = catchAsync(async (req, res, next) => {
  const { value, error } = validSchemas.userValidSchema.validate(req.body);

  if (error) throw HttpError(400, error.message);

  req.body = value;

  next();
});


