const Joi = require("joi");

const addUserSchema = Joi.object({
  password: Joi.string().min(6).max(12).required(),
  email: Joi.string().email().required(),
});

module.exports = {
  addUserSchema,
};
