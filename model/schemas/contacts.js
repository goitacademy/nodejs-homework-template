const { Schema, model } = require('mongoose')

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set contact Name'],
    },
    email: {
      type: String,
      required: [true, 'Set Email'],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, 'Set Phone number'],
      unique: true,
    },
  },
  { versionKey: false, timestamps: true },
)

const Contact = model('contact', contactSchema)

module.exports = Contact
