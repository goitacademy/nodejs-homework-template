const Joi = require('joi');
const mongoose = require("mongoose");


const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    required: [true, 'Set email for contact']
  },
  phone: {
    type: String,
    required: [true, 'Set phone for contact']
  },
  favorite: {
    type: Boolean,
    default: false,
  }

});

const Contact = mongoose.model("contact", contactSchema);

const Joischema = Joi.object({
  name: Joi.string()
  .alphanum()
  .min(3)
  .max(30)
  .required(),
  email: Joi.string()
  .email({ minDomainSegments: 2 }),
  phone: Joi.string()
    .pattern(+[0-9])
    .length(14),
    favorite: Joi.bool(),
});

module.exports = {Joischema, Contact};