const Joi = require("joi");


const contactSchema = Joi.object({
  name: Joi.string().min(4).max(30).required().messages({ "any.required": "missing required fields" }),
  email: Joi.string().email().required().messages({ "any.required": "missing required fields" }),
  phone: Joi.string().required().messages({ "any.required": "missing required fields" }),
});


module.exports = contactSchema;
