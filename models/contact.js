const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneReg = /^s?[(][0-9]{3}[)][^0-9][0-9]{3}-[0-9]{4}$/;

const contactSchema = Schema({
     name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      match: emailReg,
      required: [true, 'Set email for contact']
    },
    phone: {
      type: String,
      match: phoneReg,
      required: [true, 'Set phone for contact']
    },
    favorite: {
      type: Boolean,
      default: false,
    },

}, { versionKey: false, timestamps: true })

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailReg).required(),
  phone: Joi.string().pattern(phoneReg).required(),
  favorite: Joi.boolean().default(false),
});

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    joiSchema
}