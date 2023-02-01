const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().min(4).max(30).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().min(8).max(20).required(),
});

module.exports = {
  addContactSchema,
};
