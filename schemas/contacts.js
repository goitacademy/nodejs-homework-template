const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string()
    .required()
    .pattern(/\(([0-9]{3})\)?([ .-])([0-9]{3})?([ .-])([0-9]{4})/),
});

module.exports = {
  addSchema,
};
