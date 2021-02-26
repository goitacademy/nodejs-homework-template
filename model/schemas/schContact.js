const mongoose = require('mongoose')

const { Schema, model } = mongoose

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set email'],
      minLength: 2,
      maxLength: 25,
    },
    email: {
      type: String,
      required: [true, 'Set email'],
      unique: true,
      minLength: 2,
      maxLength: 256,
    },
    phone: {
      type: String,
      required: [true, 'Set phone'],
      unique: true,
      minLength: 5,
      maxLength: 20,
    },
  },
  {
    versionKey: false,
    timestamps: true, // createdAt and updatedAt
  }
)

const Contact = model('contact', contactSchema)
module.exports = Contact
