const { Schema, model } = require('mongoose')
const Joi = require('joi')

const { handleSaveErrors } = require('../helpers')

const isbnRegexp = /^\d{3}-\d-\d{3}-\d{5}-\d$/

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },

    isbn: {
      type: String,
      match: isbnRegexp,
      unique: true,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
)

contactSchema.post('save', handleSaveErrors)

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  isbn: Joi.string().pattern(isbnRegexp).required(),
})

const schemas = {
  addSchema,
}

const Contact = model('contact', contactSchema)

module.exports = {
  Contact,
  schemas,
}

// const fs = require('fs/promises')
// const path = require('path')
// const { v4 } = require('uuid')

// const contactsPath = path.join(__dirname, '/contacts.json')

// const updateContacts = async (contacts) => {
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
// }

// const listContacts = async () => {
//   const data = await fs.readFile(contactsPath)
//   const contacts = JSON.parse(data)
//   return contacts
// }

// const getContactById = async (id) => {
//   const contacts = await listContacts()
//   const contact = contacts.find((item) => item.id === id)
//   if (!contact) {
//     return null
//   }
//   return contact
// }

// const addContact = async (data) => {
//   const contacts = await listContacts()
//   const newContact = { id: v4(), ...data }
//   contacts.push(newContact)
//   await updateContacts(contacts)
//   return newContact
// }

// const updateContactsById = async (id, body) => {
//   const contacts = await listContacts()
//   const index = contacts.findIndex((item) => item.id === id)
//   if (index === -1) {
//     return null
//   }
//   contacts[index] = { id, ...body }
//   await updateContacts(contacts)
//   return contacts[index]
// }

// const removeContact = async (id) => {
//   const contacts = await listContacts()
//   const idx = contacts.findIndex((item) => item.id === id)
//   if (idx === -1) {
//     return null
//   }
//   const [result] = contacts.splice(idx, 1)
//   await updateContacts(contacts)
//   return result
// }

// module.exports = {
//   listContacts,
//   getContactById,
//   addContact,
//   updateContactsById,
//   removeContact,
// }
