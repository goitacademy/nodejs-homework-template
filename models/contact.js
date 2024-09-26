const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const favoriteValidationSchema = Joi.object({
  favorite: Joi.boolean(),
});

const contactValidationSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email(),
  phone: Joi.string(),
});

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
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
  { versionKey: false, timestamps: true }
);

const Contact = mongoose.model("contact", contactSchema);

module.exports = { Contact, contactValidationSchema, favoriteValidationSchema };