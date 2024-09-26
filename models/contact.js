const { Schema, model } = require('mongoose');
const Joi = require('joi');
const {handleMongooseError} = require('../decorators')

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true, 
    },
    favorite: {
        type: Boolean,
        default: false,
    },
}, {
    versionKey: false,
    timestamps: true
})

contactSchema.post("save", handleMongooseError)

const addSchema = Joi.object({
  name: Joi.string().required().alphanum().messages({
      'string.empty': `"name" cannot be an empty field`,
      'any.required': `"name" is a required field`
    }),
  email: Joi.string().required().email().messages({
      'string.empty': `"email" cannot be an empty field`,
      'any.required': `"email" is a required field`
    }),
  phone: Joi.string().required().min(7).pattern(/^[0-9]+$/).messages({
      'string.empty': `"phone" cannot be an empty field`,
      'any.required': `"phone" is a required field`
  }),
   favorite: Joi.boolean().default(false),
 })
 
const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})

const Contact = model("contact", contactSchema);

const schemas = {
    addSchema,
    updateFavoriteSchema,
}

module.exports = {Contact, schemas}