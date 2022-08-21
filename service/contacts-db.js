const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose
  .connect(
    'mongodb+srv://kamilWitkowski123:testtest123@cluster0.wbiy6.mongodb.net/db-contacts'
  )
  .then(() => console.log('Database connection successful'))
  .catch((err) => {
    console.log('err', err)
    process.exit(1)
  })

const Schema = mongoose.Schema

const schema = new Schema({
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

const Contacts = mongoose.model('contacts', schema)

module.exports = Contacts
