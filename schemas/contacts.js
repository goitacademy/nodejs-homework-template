const Joi = require('joi');

const idSchema = Joi.string().guid();
const favoriteSchema = Joi.object({ favorite: Joi.boolean().required() });
const nameSchema = Joi.string().regex(
  /\b([A-Za-zÀ-ÿà-ÿА-Яа-я]['.]?[-a-z.]+[ ]*)+/
);
const phoneSchema = Joi.string()
  .min(10)
  .max(15)
  .regex(
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
  );
const emailSchema = Joi.string().email({
  minDomainSegments: 2,
  tlds: { allow: ['com', 'net', 'ua'] },
});
const personDataSchema = Joi.object().keys({
  name: nameSchema.required(),
  phone: phoneSchema.required(),
  email: emailSchema.required(),
  favorite: Joi.boolean().default(false),
});

module.exports = {
  personDataSchema,
  idSchema,
  favoriteSchema,
};
