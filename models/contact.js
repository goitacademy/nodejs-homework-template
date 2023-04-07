const { Schema, model } = require('mongoose')

const contactSchema = new Schema(
      {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        require: [true, 'Set email for contact']
    },
    phone: {
        type: String,
        match: /^(\d{3})-\d{3}-\d{4}$/,
        require: [true, 'Set phone for contact']
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  })

const Contact = model("contact", contactSchema)

module.exports = Contact;
