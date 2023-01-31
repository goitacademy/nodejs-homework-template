const Joi = require("joi");

const sendVerifySchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required()
    .messages({ "any.required": "missing required field email" }),
});

module.exports = { sendVerifySchema };
