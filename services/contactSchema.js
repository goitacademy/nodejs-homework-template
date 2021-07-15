const { Schema } = require('mongoose')
const contactSchema = Schema(
  {
    name: {
      type: String,
      minlength: [1, 'The name must contain at least 1 letter'],
      required: [true, 'Name must be specified'],
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: 'Email address is required',
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address',
      ],
    },
    phone: {
      type: String,
      unique: true,
      required: 'Number phone is required',
      match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
)

module.exports = contactSchema
