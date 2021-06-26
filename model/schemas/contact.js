const mongoose = require('mongoose')
const { Schema } = mongoose

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    }
  },
  { versionKey: false, timestamps: true }
)

contactSchema.path('name').validate((value) => {
  const re = /[A-Z]\w+/
  return re.test(String(value))
})

const Contact = mongoose.model('contact', contactSchema)

module.exports = Contact
