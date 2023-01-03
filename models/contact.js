const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers')

const contactSchema = new Schema(  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
  },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    }
})

contactSchema.post("save", handleMongooseError)
  
const schemaBody = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().trim(),
  phone: Joi.string().trim(),
  favorite: Joi.boolean(),
});

const schemaUpdateFavorite = Joi.object({
  favorite: Joi.boolean().required(),
}); 

const schemas = {
  schemaBody,
  schemaUpdateFavorite,
}

const Contact = model('contact', contactSchema)

module.exports = {
  Contact,
  schemas,
}