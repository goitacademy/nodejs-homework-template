const mongoose = require("mongoose");
const {Schema, model} = require("mongoose");
const Joi = require('joi');
const MongooseError = require('../../Helpers/MongooseError')

const emailSchema = { minDomainSegments: 2, tlds: { allow: ["com", "net"] } };
const phoneSchema = /^[\d\-()]{6,18}$/;

const schemaContact = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email(emailSchema)
    .required(),
  phone: Joi.string()
    .pattern(phoneSchema)
    .required(),
  favorite: Joi.boolean(),
});

const schemaUpdateContact = Joi.object({
   favorite: Joi.boolean().required(),
});

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
      match: phoneSchema,
    },
    favorite: {
      type: Boolean,
      default: false,
    }
    },
    {versionKey: false, timestamps: true}
)

contactSchema.post("save", MongooseError);

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemaContact,
  schemaUpdateContact
};
