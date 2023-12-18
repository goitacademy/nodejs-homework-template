const mongoose = require('mongoose')
const { Schema, model } = mongoose

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Set email'],
    },
    phone: {
      type: String,
    },
    features: {
      type: Array,
      set: (data) => (data || []),
    },
    // date: { type: Date, default: Date.now },
    owner: {
      name: String,
      email: String,
      phone: String,
    },
  },
  { versionKey: false, timestamps: true }
)

contactsSchema.virtual('id').get(() => {
  return this._id
})

const Contact = model('contacts', contactsSchema)

module.exports = Contact
