const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: 255,
      minlength: 3,
    },
    email: {
      type: String,
      trim: true,
      validate: () => console.log(this),
    },
    phone: {
      type: String,
      max: 20,
      min: 7,
    },
  },
  {
    timestamps: true,
  },
)

const Contact = mongoose.model('Contact', contactSchema, 'contacts')

module.exports = Contact
