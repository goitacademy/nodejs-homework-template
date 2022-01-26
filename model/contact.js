const { Schema, model } = require("mongoose");
const Joi = require("joi");

const phoneRegexp = /^[0-9]{10}$/;

const contactSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    match: phoneRegexp,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const joiSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  email: Joi.string().required(),
  favourite: Joi.bool,
});

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  joiSchema,
};