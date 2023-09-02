const Joi = require("joi");

const contactSchema = Joi.object({
    name: Joi.string().required().messages({ "any.required": "Missing fields: {{#label}} is required!" }),
    email: Joi.string().email().required().messages({ "any.required": "Missing fields: {{#label}} is required!" }),
    phone: Joi.string().pattern(/^\(\d{3}\) \d{3}-\d{4}$/).required().messages({
        "any.required": "Missing fields: {{#label}} is required!",
        "string.pattern.base": "{{#label}} must be a valid phone number in the following format (000) 000-0000"
    }),
    favorite: Joi.boolean()
})

const idSchema = Joi.object().keys({
  id: Joi.string()
    .required()
    .regex(/^[0-9a-fA-F]{24}$/, 'MongoDB ObjectId'),
})

const statusSchema = Joi.object({
  favorite: Joi.boolean().required()
})



const idSchemaGlobal = Joi.object().keys({
  params: idSchema
});

const contactSchemaGlobal = Joi.object().keys({
  body: contactSchema
});

const idStatusSchemaGlobal = Joi.object().keys({
  params: idSchema,
  body: statusSchema
});

const idContactSchemaGlobal = Joi.object().keys({
  params: idSchema,
  body: contactSchema,
});


module.exports = { contactSchemaGlobal, idSchemaGlobal, idStatusSchemaGlobal, idContactSchemaGlobal };
