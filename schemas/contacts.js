const Joi = require("joi");
const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .pattern(/^(\+\d{1,2}\s?)?(\(\d{1,4}\))?[0-9.\-\s]{6,}$/)
      .required(),
      favorite:Joi.boolean(),
      __v:Joi.number()
  });
  const updateFavoriteSchema=Joi.object({
    favorite:Joi.boolean().required()
  })
  const schemas={addSchema,updateFavoriteSchema}
  module.exports= schemas;