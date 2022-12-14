const Joi = require("joi");

const contact = Joi.object().keys({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().min(8).max(14),
});

const favoriteJoySchema = Joi.object({
  favorite: Joi.boolean(),
});

module.exports = { contact, favoriteJoySchema };
