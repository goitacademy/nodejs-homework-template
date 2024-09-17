const Joi = require("joi");

const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" required failed`,
  }),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

module.exports = contactAddSchema;
