const {Schema, model} = require("mongoose")
const { handleSaveError, runValidatorsAtApdate} = require("../models/hooks")
const Joi = require('joi');

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
  }, 
  {versionKey: false}
)

contactSchema.pre("findOneAndUpdate", runValidatorsAtApdate)
contactSchema.post("save", handleSaveError)


const Contact = model("contact", contactSchema)

const joiAddSchema = Joi.object({
    name: Joi.string().pattern(/^[a-zA-Z\s'-]+$/).max(25).required()
        .messages({
      "string.pattern.base": "The name should only contain letters, spaces, hyphens, and apostrophes.",
      "string.max": "The name should not exceed 25 characters.",
      "any.required": "Missing required name field.",
    }),
    email: Joi.string().email().required()
      .messages({
        "any.required": "Missing required email field.",
          "string.email": "Invalid email format. Please enter a valid phone number"
    }),
    phone: Joi.string().required().pattern(/^[0-9+()\\-]*$/)
      .messages({
        "any.required": "Missing required phone field.",
           "string.pattern.base": "Please enter a valid phone number. The phone should only contain numbers, spaces, plus, and brackets."
    }),
    favorite: Joi.boolean()
})

const joiFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({ "any.required": "missing field favorite"})
})

module.exports = {Contact, joiAddSchema, joiFavoriteSchema}