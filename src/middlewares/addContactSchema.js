const joi = require('joi')
const {codeRegexp} = require('../../models/constants')

const addContactSchema = joi.object({
  name: joi.string()
    .min(3)
    .max(100),
  //  .required(),
  email: joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: joi.string().length(10).pattern(codeRegexp).required(),
  favorite: joi.boolean()
})

module.exports = { addContactSchema }
