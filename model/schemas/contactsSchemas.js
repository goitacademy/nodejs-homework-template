const { Schema, model } = require('mongoose')

const contactsSchema = new Schema({
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
})

// contactsSchema.path('name').validate((value) => {
//   const re = /[A-Z]w*/

//   return re.test(String(value))
// })

const contacts = model('contacts', contactsSchema)

module.exports = contacts
