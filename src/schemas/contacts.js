const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      unique: true,
      match: [
        /^\w+([\-]?\w+)*@\w+([\-]?\w+)*(\.\w{2,3})+$/ /* eslint-disable-line */,
        'Please fill a valid email address',
      ],
    },
    phone: {
      type: String,
      match: [
        /[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}/ /* eslint-disable-line */,
        'Please fill a valid phone number',
      ],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true },
)

const Contact = mongoose.model('contact', contactSchema)

module.exports = Contact