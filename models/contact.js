const Joi = require("joi");
const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
  },
  email: { type: String, required: [true, "Email is required."] },
  phone: String,
  favorite: {
    type: Boolean,
    default: false,
  },
});

const contactJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string(),
  favorite: Joi.bool(),
});

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  contactJoiSchema,
};
