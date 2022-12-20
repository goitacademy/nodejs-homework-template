const Joi = require("joi");

const newContactSchema = Joi.object({
  name: Joi.string().min(2).max(40).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: false },
    })
    .required(),

  phone: Joi.string().pattern(/^(\+)?([- ()]?\d[- ()]?){10,14}$/),

  favorite: Joi.boolean(),
});

module.exports = newContactSchema;
