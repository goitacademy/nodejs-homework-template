const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const { Schema, SchemaTypes } = mongoose

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: SchemaTypes.ObjectId,
    ref: 'user',
  }
}, { versionKey: false, timestamps: true })

contactSchema.plugin(mongoosePaginate)

const Contacts = mongoose.model('contact', contactSchema)

module.exports = Contacts
