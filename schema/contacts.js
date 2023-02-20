const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  phone: Joi.number().integer().required(),
  favorite: Joi.bool(),
});

const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
}).min(1);

module.exports = {
  addSchema,
  updateSchema,
};
