const {Schema, model} = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema({
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
  },{versionKey: false, timestamps: true})

  const joiSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ tlds: { allow: false } }),
    phone: Joi.string().required(),
    favorite: Joi.bool()
  });

  const updateFavoriteSchema = Joi.object({
    favorite: Joi.bool().required()
});

const Contact = model("contact", contactSchema)   

  module.exports = {Contact, joiSchema, updateFavoriteSchema};