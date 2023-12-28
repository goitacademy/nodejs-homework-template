const { Types } = require("mongoose");
const { HttpError } = require("../Helpers");
const contactSchema = require("../Shema/shema");
const User = require("../modelUser/userModel");

//==
const checkId = async (req, res, next) => {
  const { contactId } = req.params;
  const idIsValid = Types.ObjectId.isValid(contactId);
  console.log(idIsValid);
  // if (!idIsValid) throw new HttpError(404, "Invalid");
  const userExists = await User.findById(contactId);
  console.log(userExists);
  // if (!userExists) throw new HttpError(404, "User not found");
  next();
};

//==
const validateBody = (shema) => {
  const func = (req, res, next) => {
    const { error } = shema.validate(req.body);
    if (error) {
      next(new HttpError(400, error.message));
    }
    next();
  };
  return func;
};

//==
const checkCreateUserData = async (req, res, next) => {
  const { value } = contactSchema.validate(req.body);
  const userExists = await User.exists({ email: value.email });
  if (userExists) {
    throw new HttpError(409, "User already exists");
  }
  req.body = value;
  next();
};

//==
const checkUpdateUserData = async (req, res, next) => {};

module.exports = {
  validateBody,
  checkCreateUserData,
  checkId,
};
