const mongoose = require("mongoose");
const Joi = require("joi");

const contactShema = new mongoose.Schema({
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
});

const joiSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().min(3).max(30).required(),
  phone: Joi.string().min(10).max(23),
});

const Contacts = mongoose.model("contacts", contactShema);

module.exports = {
  Contacts,
  joiSchema,
};
