const Joi = require("joi");

// Validates sent data for POST & PUT methods
const addContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  phone: Joi.string().required(),
  /**no phone validation just yet ^\(\d{3}\) \d{3}-\d{4}$
   */
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string().email({
    minDomainSegments: 2,
  }),
  phone: Joi.string(),
  /**no phone validation just yet ^\(\d{3}\) \d{3}-\d{4}$
   */
});

module.exports = { addContactSchema, updateContactSchema };
