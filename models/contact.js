const { Schema, model } = require("mongoose");
const Joi = require("joi");
const joiPhoneNumber = require("joi-phone-number");
const myCustomJoi = Joi.extend(joiPhoneNumber);

const {mongooseError} = require("../helpers")

const contactSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Set name for contact'],
      },
      email: {
        type: String,
        unique: true,
        required: true,
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
      owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
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
  // phone: Joi.string()
  //   .trim()
  //   .regex(/^\+?[()\-\d]+$/)
  //   .min(9)
  //   .max(16)
  //   .required()
  //   .messages({
  //     "any.required": "missing required phone field",
  //     "string.base": "Phone number must be a string",
  //     "string.empty": "missing required phone field",
  //     "string.pattern.base": "Phone number is invalid",
  //     "string.min": "Phone number should have a minimum length of {#limit}",
  //     "string.max": "Phone number should have a maximum length of {#limit}",
  //   }),
  phone: myCustomJoi.string().phoneNumber().required().messages({
    "any.required": "missing required phone field",
    "string.base": "Phone number must be a string",
    "string.empty": "missing required phone field",
    "string.pattern.base": "Phone number is invalid",
    "phoneNumber.invalid": "Phone number is invalid",
  }),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required()
  .messages({
    "any.required": "missing field favorite"
  }),
})


contactSchema.post("save", mongooseError )

contactSchema.index({ name: 1 }, { unique: true });
contactSchema.index({ email: 1 }, { unique: true });
contactSchema.index({ phone: 1 }, { unique: true });

const Contact = model("contact", contactSchema);

const schemas = {
  addSchema,
  updateFavoriteSchema,
}
module.exports = {
  Contact,
  schemas,
};