const { Schema, model } = require('mongoose')
const Joi = require('joi');
const {handleMongooseError} = require('../utils');

const phoneRegular = (/^\(\d{3}\)\s\d{3}-\d{4}$/)
const contactSchema = new Schema(
      {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        require: [true, 'Set email for contact']
    },
    phone: {
        type:String,
        match: phoneRegular,
        require: [true, 'Set phone for contact']
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    }, { versionKey: false })
  
contactSchema.post("save", handleMongooseError)

    const addShema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" is required`,
    "string.empty": `"name" cannot be empty`,
    "string.base": `"name" must be string`
  }),
  email: Joi.string().required().messages({
    "any.required": `"email" is required`,
    "string.empty": `"email" cannot be empty`,
    "string.base": `"email" must be string`
  }),
  phone: Joi.string().pattern(phoneRegular).required().messages({
    "any.required": `"phone" is required`,
    "number.empty": `"phone" cannot be empty`,
    "number.base": `"phone" must be string, example: (###) ###-####`
  }),
  favorite: Joi.boolean(),
})
const updateSchemaContact = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": `missing field "favorite"`,
  }),
})

const schemas = {
  addShema,
  updateSchemaContact
}
const Contact = model("contact", contactSchema)

module.exports = { Contact, schemas};
