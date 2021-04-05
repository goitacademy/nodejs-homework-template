const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'required'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'required'],
    },
    phone: {
      type: String,
      unique: true,
      required: [true, 'required'],
    },
    subscription: String,
    password: String,
    token: String,
    owner: {
      type: Schema.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false }
)

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact
