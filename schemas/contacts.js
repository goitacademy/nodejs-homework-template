const Joi = require('joi')

const contactSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
})
module.exports = contactSchema
// const contact = {
//   name: 'Chaim Lewis',
//   email: 'dui.in@egetlacus.ca',
// }

// const { error } = contactSchema.validate(contact)
// if (error) {
//   console.log(error.message)
// }
