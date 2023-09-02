const Joi = require("joi");

const usersSchemas = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().required(),
  token: Joi.string().required(),
  avatar: Joi.string().required(),
});

module.exports = usersSchemas;
