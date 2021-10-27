const Joi = require("joi")

const contactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.number().required(),
})

module.exports = contactSchema

// {
//     "name": "lalala",
//     "email": "lalalala@mail.com",
//     "phone": "80299999999"
// }
