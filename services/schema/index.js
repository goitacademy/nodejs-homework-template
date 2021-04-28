const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'This field is required'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'This field is required'],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, 'This field is required'],
      unique: true,
      validate: {
        validator: function (v) {
          return /\(\d{3}\)\s\d{3}-\d{4}/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false },
);

const Contact = model('contact', contactSchema);

module.exports = Contact;
