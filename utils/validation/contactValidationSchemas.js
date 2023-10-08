const Joi = require("joi");

const validationSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(30)
    .regex(/^[a-zA-Zа-яА-ЯіїєІЇЄ'\s-]+$/)
    .required(),
  email: Joi.string()
    .min(5)
    .max(40)
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "ua"] },
    })
    .required(),
  phone: Joi.string().min(8).max(30).required(),
  favorite: Joi.boolean().default(false),
});

const validationFavorite = Joi.object({
  favorite: Joi.boolean().default(false).required(),
});

module.exports = {
  validationSchema,
  validationFavorite,
};
