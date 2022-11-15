const Joi = require("joi");

const schemaOfContacts = Joi.object({
name: Joi.string().required(), 
email: Joi.string().required(), 
phone: Joi.string().required()
});
const patchSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(), 
  phone: Joi.string()
})


module.export = {schemaOfContacts, patchSchema};