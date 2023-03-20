const Contact = require("../models/contactModel");
const { catchAsync, updateContactValidation, AppError } = require("../utils");

const checkUpdateContactData = catchAsync(async (req, res, next) => {
  const { error, value } = updateContactValidation(req.body);
  console.log(value)

    if (error) {
    return next(new AppError(400, "Invalid user data..."));
  }

  const contactExists = await Contact.exists({ email: value.email });

  if (contactExists) {
    return next(new AppError(409, "User with this email already exists"));
  }

  req.body = value;
  next();
});

module.exports = checkUpdateContactData;
