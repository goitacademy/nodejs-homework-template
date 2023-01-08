const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
});

const schemaId = Joi.object({
  contactId: Joi.string().min(10),
});

module.exports = {
  contactSchema,
  schemaId,
};
const statusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
module.exports = {
  contactSchema,
  schemaId,
  statusSchema,
};
