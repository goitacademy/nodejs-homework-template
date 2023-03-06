const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({}).required(),
  phone: Joi.string().min(10).max(15).required(),
  favorite: Joi.boolean(),
});

const contactUpdateStatusSchema = Joi.object({
    favorite: Joi.boolean().required(),
})

const authSchema = Joi.object({
  email: Joi.string().email({}).required(),
  password: Joi.string().min(6).max(30).required(),
});

module.exports = { contactSchema, contactUpdateStatusSchema, authSchema };