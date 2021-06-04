const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const { Schema } = mongoose

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String
  },
  favorite: {
    type: Boolean,
    default: false
  },
  user: {
    type: String,
    ref: 'user'
  }
}, { versionKey: false, timestamps: true })

contactSchema.plugin(mongoosePaginate)

const Contact = mongoose.model('contacts', contactSchema)

module.exports = Contact
