const res = require('express/lib/response')
const fs = require('fs/promises')
const contactsPath = './models/contacts.json'
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

const listContacts = async () => {
  return await Contacts.find()
}

const getContactById = async (contactId) => {
  return await Contacts.findOne({ _id: `${contactId}` }).catch((err) =>
    console.log('err', err)
  )
}

const removeContact = async (contactId) => {
  return await Contacts.findOneAndRemove({ _id: contactId }).catch((err) =>
    console.log('err', err)
  )
}

const addContact = async ({ name, email, phone }) => {
  return await Contacts.create({ name, email, phone }).catch((err) =>
    console.log('err', err)
  )
}

const updateContact = async (contactId, body) => {
  return await Contacts.findOneAndUpdate({ _id: contactId }, body).catch(
    (err) => console.log('err', err)
  )
}



module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
