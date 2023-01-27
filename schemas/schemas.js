const Joi = require("joi");

const addContactSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().required(),
    phone: Joi.string().min(10).required(),
    favorite: Joi.bool()
  });

const updateStatusSchema = Joi.object({
    favorite: Joi.bool().required()
  })

module.exports = {
  addContactSchema,
  updateStatusSchema,
};