const { Schema, model } = require("mongoose");
const Joi = require("joi");
const {mongooseError} = require("../helpers")
// const uniqueValidator = require("mongoose-unique-validator");

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
      },
      email: {
        type: String,
        // unique: true,
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
  //  timestamps: true
  })

const addSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .required()
    .messages({
      "any.required": "missing required name field",
      "string.base": "Name must be a string",
      "string.empty": "missing required name field",
      "string.min": "Name should have a minimum length of {#limit}",
    })
    ,
  email: Joi.string()
    .trim()
    .email()
    .required()
    .messages({
      "any.required": "missing required email field",
      "string.base": "Email must be a string",
      "string.empty": "missing required email field",
      "string.email": "Email must be a valid email address",
    }),
  phone: Joi.string()
    .trim()
    // .regex(/^\+?[()\-\d]+$/)
    .min(9)
    .max(16)
    .required()
    .messages({
      "any.required": "missing required phone field",
      "string.base": "Phone number must be a string",
      "string.empty": "missing required phone field",
      "string.pattern.base": "Phone number is invalid",
      "string.min": "Phone number should have a minimum length of {#limit}",
      "string.max": "Phone number should have a maximum length of {#limit}",
    }),
    favorite: Joi.boolean(),
});


contactSchema.post("save", mongooseError )

const Contact = model("contact", contactSchema);

// contactSchema.plugin(uniqueValidator, { message: "The {PATH} '{VALUE}' already exists." });

const schemas = {
  addSchema,
}
module.exports = {
  Contact,
  schemas,
};