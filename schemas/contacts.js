const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required()
})
 

const schemaId = Joi.string().min(1);


module.exports = {
  contactSchema,
  schemaId
}