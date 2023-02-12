const Joi = require("joi");


const newContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(15).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().min(9).max(15).required(),
});


const contactUpdateSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(15).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .optional(),
  phone: Joi.string().min(9).max(15).optional(),
}).min(1);


const validateContact = (schema, object) => {
  const { error, value } = schema.validate(object);

  if (error) {
    return { error: error.details[0].message, value: null };
  }
  return { error: null, value };
};

module.exports = { newContactSchema, contactUpdateSchema,validateContact };