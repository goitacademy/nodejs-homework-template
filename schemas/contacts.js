const Joi = require("joi");

const newContacts = Joi.object({
  name: Joi.string().min(3).required().messages({
    "any.required":"you should provide name!!"
  }),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});




const addContactsSchema = Joi.object({
    name: Joi.string().min(3).required().messages({
      "any.required":"you should provide name!!"
    }),
    email: Joi.string().email(),
    phone: Joi.string(),
  });

module.export = {
  newContacts,
  addContactsSchema,
}
