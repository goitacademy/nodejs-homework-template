const Joi = require("joi");

const contactsSchema = Joi.object().keys({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email(),
  phone: Joi.string().min(14),
});

const updateStatusSchema = Joi.object({ favorite: Joi.boolean().optional() });

module.exports = {
  contactsSchema,
  updateStatusSchema,
};

module.exports = { contactsSchema, updateStatusSchema };