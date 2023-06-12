const Joi = require("joi");
const {emailRegexp,nameRegexp,phoneRegexp} = require("../constans/contacts")

const addSchema = Joi.object({
  name: Joi.string().pattern(nameRegexp).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
   favorite: Joi.boolean(),
})

const ContactUpdateFavoriteShema = Joi.object({
  favorite: Joi.boolean().required()
})

module.exports = {
  addSchema,
  ContactUpdateFavoriteShema
}