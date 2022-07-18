const Joi = require("joi");

const resendVerifyEmailJoiSchema = Joi.object({
  email: Joi.string().email().trim().required(),
});

module.exports = resendVerifyEmailJoiSchema;
