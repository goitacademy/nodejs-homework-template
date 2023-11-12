const Joi = require("joi");

const contactValidationchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().default(false),
});



module.exports = {
  contactValidationchema,
 
  
};