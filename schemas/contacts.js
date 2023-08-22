const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .required()
    .messages({ "any.required": `missing required name field` }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({ "any.required": `missing required email field` }),
  phone: Joi.string()
    .min(5)
    .required()
    .messages({ "any.required": `missing required phone field` }),
});

module.exports = {
  addSchema,
};
