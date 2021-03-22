const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    subscription: String,
    password: String,
    token: String,
  },
  { versionKey: false }
)

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact
