const {Schema, model} = require('mongoose')
const {handleMongooseError} = require('../helpers')

const Joi = require('joi')

const cotactSchema = new Schema({
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
    },  
})
cotactSchema.post('save', handleMongooseError )

const addSchemaErrorMessages = {
    "string.base": "Field {#label} must be a string.",
    "string.empty": "Field {#label} cannot be empty.",
    "string.email": "Field {#label} must be a valid email address.",
    "string.pattern.base": "Field {#label} must be in the format 000-000-00-00",
    "object.min": "missing fields",
    "any.required": "missing required {#label} field",
};
  
const addSchemas = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
}).messages(addSchemaErrorMessages);

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required()
})

const schemas = {
  addSchemas,
  updateFavoriteSchema,
}

const Contact = model('contact', cotactSchema)

module.exports = {
    Contact,
    schemas,
}