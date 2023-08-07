const Joi = require("joi");


const contactSchemaPost = Joi.object({
  name: Joi.string().min(4).max(30).required().messages({ "any.required": "missing required fields" }),
  email: Joi.string().required().messages({ "any.required": "missing required fields" }),
  phone: Joi.string().required().messages({ "any.required": "missing required fields" }),
});

const contactSchemaPut = Joi.object({
    name: Joi.string().min(4).max(30).messages({ "any.required": "missing required fields" }),
    email: Joi.string().messages({ "any.required": "missing required fields" }),
    phone: Joi.string().messages({ "any.required": "missing required fields" }),
})

module.exports = {contactSchemaPost, contactSchemaPut};
