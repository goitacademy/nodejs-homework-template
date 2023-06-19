const Joi = require("joi");

const { ctrlWrapper, HttpError } = require("../helpers");

const { User } = require("../models/user");

const registrationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

// const loginSchema = Joi.object({
//   email: Joi.string().required(),
//   password: Joi.string().min(6).required(),
// });

const register = async (req, res) => {
  const { error } = registrationSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "<Помилка від Joi або іншої бібліотеки валідації>");
  }
  const newUser = await User.create(req.body);
  res.json({
    email: newUser.email,
    name: newUser.name,
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
