const { Schema, SchemaTypes, model } = require('mongoose')
const { Owner } = require('../../helpers/constants')

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
    owner: {
      type: SchemaTypes.ObjectId,
      ref: Owner.USER,
    },
  },
  { versionKey: false, timestamps: true },
)

const Contact = model('contact', contactSchema)

module.exports = Contact
