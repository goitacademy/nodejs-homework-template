const {Schema, default: mongoose} = require('mongoose')

const schema = new Schema ({
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
  },
  { versionKey: false}
  )

const schemaContacts = mongoose.model('contact', schema)

module.exports = schemaContacts