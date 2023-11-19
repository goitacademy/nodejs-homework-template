const Joi = require("joi");

const phoneRegexp = /^\(\d{3}\) \d{3}-\d{4}$/;

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua", "pl"] },
    })
    .required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  favorite: Joi.boolean(),
});

module.exports = {
  updateFavoriteSchema,
  addSchema,
};
