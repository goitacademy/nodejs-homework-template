const Joi = require("joi");

const usersSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(32).required(),
});

module.exports = usersSchema;
