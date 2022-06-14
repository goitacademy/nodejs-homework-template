const joi = require('joi')

const updateContactSchema = joi.object({
  name: joi.string()
    .min(3)
    .max(100)
    .optional(),
  email: joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .optional(),
  phone: joi.string().length(10).pattern(/^[0-9]+$/).optional()
})

module.exports = { updateContactSchema }
