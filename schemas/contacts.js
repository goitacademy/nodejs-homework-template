const { bool } = require('joi');
const Joi = require('joi');

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required()
})


const updateFavoriteSchema = Joi.object({
    favorite: Joi.bool().required(),
})

module.exports = {
    addSchema,
    updateFavoriteSchema,
}