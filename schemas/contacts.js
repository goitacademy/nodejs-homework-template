const Joi = require("joi");

const addShema = Joi.object({
  name: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required()
})
module.exports = addShema