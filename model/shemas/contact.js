const { Schema, model } = require('mongoose')

const contactShema = new Schema(
  {
    name: { type: String, required: [true, 'Contact name is required'] },
    email: { type: String, required: [true, 'Contact email is required'] },
    phone: { type: String, required: [true, 'Contact phone is required'] },
    favorite: {
      type: Boolean,
      default: false
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

const Contact = model('contacts', contactShema)

module.exports = Contact
