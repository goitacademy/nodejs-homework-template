const Joi = require("joi");

const regexString = "^[A-Z][a-z]+ [A-Z][a-z]+$";

const addSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .pattern(new RegExp(regexString))
    .message("Name must be in format: FirstName LastName")
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().required(),
});

module.exports = {
  addSchema,
};
