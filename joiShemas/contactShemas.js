const Joi = require("joi");

const contact = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email(),
  phone: Joi.string()
    .pattern(/^[0-9-]+$/)
    .min(7)
    .required(),
  favorite: Joi.boolean(),
});

const status = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  contact,
  status,
};
