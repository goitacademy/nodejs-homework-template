const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .pattern(/^\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+$/)
    .trim()
    .required(),
  email: Joi.string().email().trim().required(),
  phone: Joi.string()
    .min(10)
    .pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/, "numbers")
    .trim()
    .required(),
});

module.exports = contactSchema;
