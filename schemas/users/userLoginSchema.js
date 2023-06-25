const Joi = require("joi");

const userLoginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
}).messages({
  "any.required": "missing required {#key} field",
});

module.exports = userLoginSchema;
