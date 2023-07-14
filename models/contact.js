// const Joi = require("joi");
const { Schema, model } = require("mongoose");

const dataEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/   // nick@mail.com
const dataPhone = /^\d{3}-\d{3}-\d{4}$/;  // 222-333-4444


const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    match: dataEmail
  },
  phone: {
    type: String,
    match: dataPhone
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, {versionKey: false, timestamps: true});

const Contact = model("contact", contactSchema);

module.exports ={
    Contact
}