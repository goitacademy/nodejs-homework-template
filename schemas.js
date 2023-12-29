const Joi = require("joi")

const bodySchema = Joi.object({
  name: Joi.string().required(),

  email: Joi.string()
    .required(),

  phone: Joi.string()
    .required(),
  
  favorite: Joi.boolean()
})

const updateByFavoriteSchema = Joi.object({
  favorite: Joi.boolean()
  .required()
})

module.exports = {
  bodySchema,
  updateByFavoriteSchema
}