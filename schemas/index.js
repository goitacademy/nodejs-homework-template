const Joi = require("joi");

const forPosting = Joi.object({
  name: Joi.required(),
  email: Joi.required(),
  phone: Joi.required(),
});

const forPuting = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.alternatives().try(Joi.string(), Joi.number()),
}).or("name", "email", "phone");

module.exports = {
  forPosting,
  forPuting,
};
