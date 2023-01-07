const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().min(3).max(33).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string()
    .pattern(/^[0-9() -]+$/, "numbers")
    .required(),
  favorite: Joi.boolean().optional().default(false),
});

const putContactSchema = Joi.object({
  name: Joi.string().min(3).max(33).optional(),
  email: Joi.string().email({ minDomainSegments: 2 }).optional(),
  phone: Joi.string()
    .pattern(/^[0-9() -]+$/, "numbers")
    .optional(),
});

const updateStatusSchema = Joi.object({ favorite: Joi.boolean().optional() });

module.exports = {
  addContactSchema,
  putContactSchema,
  updateStatusSchema,
};
