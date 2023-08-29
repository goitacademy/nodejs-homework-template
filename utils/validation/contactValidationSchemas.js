const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const byIdSchema = Joi.object().keys({
  contactId: Joi.string()
    .required()
    .regex(/^[0-9a-fA-F]{24}$/, "MongoDB ObjectId"),
});

const changeFavotiteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { addSchema, byIdSchema, changeFavotiteSchema };
