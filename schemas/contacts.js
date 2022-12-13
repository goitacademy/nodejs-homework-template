const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().trim().required(),
  phone: Joi.string().trim().required(),
});

const schemaParams =
  Joi.object({
    contactId: Joi.string().max(25).required(),
    });


module.exports = {
  schema,
  schemaParams,
}