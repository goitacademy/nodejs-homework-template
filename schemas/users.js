const Joi = require("joi");

const userRegisterSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    "any.required": `missing required password field`,
  }),
  email: Joi.string().required().messages({
    "any.required": `missing required email field`,
  }),
});

module.exports = {
  userRegisterSchema,
};
