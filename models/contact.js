const { Schema, model } = require('mongoose');
const Joi = require('joi')
const { handleSchemaValidationErrors } = require('../helpers');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      unique: true, 
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true
  }
)

contactSchema.post("save", handleSchemaValidationErrors)

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  phone: Joi.string().required(),
  favorite: Joi.boolean()
})

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required()
})

const schemas = {
  addSchema,
  updateFavoriteSchema
}

const Contact = model("contact", contactSchema)

module.exports = {
  Contact,
  schemas
}