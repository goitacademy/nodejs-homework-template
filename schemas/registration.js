const Joi = require("joi");

const usersSchemas = Joi.object({
  name: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = usersSchemas;
