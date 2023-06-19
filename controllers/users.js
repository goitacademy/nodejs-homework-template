const Joi = require("joi");

const { ctrlWrapper, HttpError } = require("../helpers");

const { User } = require("../models/user");

const registrationSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string(),
});

// const loginSchema = Joi.object({
//   email: Joi.string().required(),
//   password: Joi.string().min(6).required(),
// });

const register = async (req, res) => {
  const { error } = registrationSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const newUser = await User.create(req.body);
  
  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
