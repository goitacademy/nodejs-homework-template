const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(30)
    .messages({ "any.required": `missing required name field` })
    .required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .messages({ "any.required": `missing required email field` })
    .required(),

  phone: Joi.string()
    .messages({ "any.required": `missing required phone field` })
    .pattern(/\(([0-9]{3})\)?([ .-])([0-9]{3})?([ .-])([0-9]{4})/)
    // .pattern(/^\d{3}-d{3}-d{4}$/)
    .required(),

  favorite: Joi.boolean().valid(false),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .messages({ "any.required": `missing required favorite field` })
    .required(),
});

module.exports = {
  addSchema,
  updateFavoriteSchema,
};
