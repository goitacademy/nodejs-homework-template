const Joi = require("joi");

const validateContactSchema = Joi.object({
  name: Joi.string().min(1).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().required(),
});
 const validateUpdateContactSchema = Joi.object({
   name: Joi.string().min(1).max(30),
   email: Joi.string().email({ minDomainSegments: 2 }),
   phone: Joi.string(),
 });
module.exports = {
  validateContactSchema,
  validateUpdateContactSchema,
};
