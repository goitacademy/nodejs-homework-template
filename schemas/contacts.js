const { Schema, model } = require('mongoose')

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, {
  versionKey: false,
  toJSON: {
    virtuals: true,
    transform: function (_, ret) {
      delete ret._id
      return ret
    }
  }
})

const Contact = model('contact', contactSchema)

module.exports = Contact
