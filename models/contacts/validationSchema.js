// created by Irina Shushkevych
const Joi = require('joi')

const joiAddContactSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Zа-яА-Я ]+$/)
    .min(2)
    .max(30)
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(7).max(20).required(),
  favorite: Joi.bool().optional()
})

const joiUpdateContactSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Zа-яА-Я ]+$/)
    .min(2)
    .max(30)
    .optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().min(7).max(20).optional(),
  favorite: Joi.bool().optional()

})

const joiUpdateContactFavoritsScheme = Joi.object({
  favorite: Joi.bool().required()

})


module.exports = { 
  joiAddContactSchema, 
  joiUpdateContactSchema,
  joiUpdateContactFavoritsScheme 
}