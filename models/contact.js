const {Schema, model} = require("mongoose");
const Joi = require("joi");
const {handleMongooseError} = require("../helpers");

const contactSchema = new Schema({
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
})

contactSchema.post('save', handleMongooseError )

const addSchemaErrorMessages = {
    "string.base": "Field {#label} must be a string.",
    "string.empty": "Field {#label} cannot be empty.",
    "string.email": "Field {#label} must be a valid email address.",
    "string.pattern.base": "Field {#label} must be in the format 000-000-00-00",
    "object.min": "missing fields",
    "any.required": "missing required {#label} field",
  };
  
  const addSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
      }).messages(addSchemaErrorMessages);

 const schemas = {
    addSchema,
  }

const Contact = model("contact", contactSchema);


module.exports = {
    Contact,
    schemas,
}