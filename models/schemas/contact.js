const { Schema } = require('mongoose')

const contactSheme = Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Minimal 2 symbols required for Name'],
      required: [true, 'Name is required']
    },
    email: {
      type: String,
      match: [
        /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/,
        'Email must be in format text@text.domain'
      ],
      required: [true, 'Email is required']
    },
    phone: {
      type: String,
      required: true,
      match: [
        /^[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
        'Pnone must be in format (xxx) xxx-xxxx'
      ]
    },
    favorite: {
      type: Boolean,
      default: false
    }
  },
  { versionKey: false, timestamps: true }
)

module.exports = contactSheme
