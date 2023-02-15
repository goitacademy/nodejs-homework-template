const { Schema, model } = require('mongoose')
const Joi = require('joi')

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
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true },
)

const { handleSchemaValidationErrors } = require('../helpers')

contactSchema.post('save', handleSchemaValidationErrors)

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
})

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

const schemas = {
  addSchema,
  updateFavoriteSchema,
}

const Contact = model('Contact', contactSchema)
module.exports = { Contact, schemas }

// const { v4 } = require('uuid')
// const fs = require('fs/promises')

// const path = require('path')
// const filePath = path.join(__dirname, './contacts.json')
// // console.log(filePath)

// const updateContacts = async (contacts) => {
//   await fs.writeFile(filePath, JSON.stringify(contacts))
// }

// const listContacts = async () => {
//   const data = await fs.readFile(filePath)
//   const contacts = JSON.parse(data)
//   return contacts
// }

// const getContactById = async (id) => {
//   const contacts = await listContacts()
//   const result = contacts.find((item) => item.id === id)
//   if (!result) {
//     return null
//   }
//   return result
// }

// const addContact = async ({ name, email, phone }) => {
//   const contacts = await listContacts()
//   const newContacts = { id: v4(), name, email, phone }
//   // console.log(newContacts)
//   contacts.push(newContacts)
//   await updateContacts(contacts)
//   return newContacts
// }

// const updateContactById = async (id, { name, email, phone }) => {
//   const contacts = await listContacts()
//   const newContacts = contacts.findIndex((item) => item.id === id)
//   if (newContacts === -1) {
//     return null
//   }
//   contacts[newContacts] = { id, name, email, phone }
//   await updateContacts(contacts)
//   return contacts[newContacts]
// }

// const removeContact = async (id) => {
//   const contacts = await listContacts()
//   const newContacts = contacts.findIndex((item) => item.id === id)
//   if (newContacts === -1) {
//     return null
//   }
//   const [deleteContact] = contacts.splice(newContacts, 1)
//   await updateContacts(contacts)
//   return deleteContact
// }

// module.exports = {
//   listContacts,
//   getContactById,
//   addContact,
//   updateContactById,
//   removeContact,
// }
