const Joi = require('joi');
const contactIdSchema = Joi.object({
  id: Joi.alternatives().try(
    Joi.string().guid({ version: 'uuidv4' }),
    Joi.string()
  ).required,
});
const nameSchema = Joi.string().regex(/\b([A-ZÀ-ÿА-Я]['.]?[-a-z.]+[ ]*)+/);
const phoneSchema = Joi.string().regex(
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
);
const emailSchema = Joi.string().email();
const personDataSchema = Joi.object().keys({
  id: contactIdSchema,
  name: nameSchema.required(),
  phone: phoneSchema.required(),
  email: emailSchema.required(),
});

module.exports = {
  personDataSchema,
  contactIdSchema,
};
