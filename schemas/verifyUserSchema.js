const Joi = require("joi");

const verifyUserSchema = Joi.object({
  token: Joi.string().required(),
});

module.exports = { verifyUserSchema };
