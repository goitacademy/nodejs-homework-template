const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .min(4)
    .required()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .message({
      "string.pattern.base": "Invalid email",
    }),
  phone: Joi.string()
    .min(8)
    .required()
    .pattern(/[\d\s()-]+/)
    .message({
      "string.pattern.base": "Invalid phone",
    }),
}).messages({
  "any.required": "missing required {{#label}} field",
});

module.exports = { addSchema };
