const Joi = require("joi");

const registerUser = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .required(),
  password: Joi.string()
    .pattern(/^[a-z\d]{8,16}$/i)
    .required(),
});

const loginUser = Joi.object({
  email: Joi.string()
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .required(),
  password: Joi.string()
    .pattern(/^[a-z\d]{8,16}$/i)
    .required(),
});

module.exports = {
  registerUser,
  loginUser,
};
