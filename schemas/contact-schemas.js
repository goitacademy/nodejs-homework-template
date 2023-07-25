const Joi = require("joi");
const contactAddSchema = Joi.object({
    name: Joi.string().required().messages({
      "any.required": `"name" must be exist`,
    }),
    email: Joi.string().required().messages({
      "any.required": `"email" must be exist`,
    }),
    phone: Joi.string().required().messages({
      "any.required": `"phone" must be exist`,
    }),
    favorite: Joi.boolean(),
  });

  const contactUpdateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required().messages({
      "any.required": "missing field favorite",
    })
})

module.exports = {
  contactAddSchema,
  contactUpdateFavoriteSchema,
}