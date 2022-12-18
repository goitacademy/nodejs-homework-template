const Joi = require("joi");

const updateContactSchema = Joi.object({
  name: Joi.string().min(2).max(40),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: false },
  }),

  phone: Joi.string().pattern(/^(\+)?([- ()]?\d[- ()]?){10,14}$/),

  favorite: Joi.boolean(),
}).min(1);

module.exports = updateContactSchema;
