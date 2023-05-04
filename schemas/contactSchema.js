const { Schema } = require("mongoose");
const emailRegex = /^([a-zA-Z0-9-.]+)@([a-zA-Z0-9-.]+).([a-zA-z]+)$/;
const phoneRegex = /^(()?\d{3}())?(-|\s)?\d{3}(-|\s)\d{4}$/;

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    required: [true, "Set email for contact"],
    match: emailRegex,
    unique: true,
  },
  phone: {
    type: String,
    match: phoneRegex,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

module.exports = contactSchema;
