const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().max(15).required(),
  favorite: Joi.boolean(),
});

const putSchema = Joi.object({
  name: Joi.string().min(4).required(),
  email: Joi.string().email().min(6).required(),
  phone: Joi.string().min(6).required(),
  favorite: Joi.boolean()
}).or("name", "email", "phone", "favorite");

const addToFavSchema = Joi.object({
  favorite:Joi.boolean().required()
})

module.exports = {
  addSchema,
  putSchema,
  addToFavSchema,
};