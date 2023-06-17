// const fs = require('fs/promises')
// const path = require('path')
// const { nanoid } = require('nanoid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
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

const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact



// const ID = nanoid()

// const contactsPath = path.join(__dirname, 'contacts.json')

// const listContacts = async () => {
//   const data = await fs.readFile(contactsPath)
//   const contacts = JSON.parse(data)
//   return contacts;
// }

// const getContactById = async (contactId) => {
//   const data = await fs.readFile(contactsPath)
//   const contacts = JSON.parse(data)

//   const contact = contacts.filter(el => el.id === contactId)

//   return contact;
// }

// const removeContact = async (contactId) => {
//   const data = await fs.readFile(contactsPath)
//   const contacts = JSON.parse(data)

//   const index = contacts.findIndex(el => el.id === contactId)
//   if (index > -1) {
//     const newcontacts = contacts.splice(index, 1)
//     return newcontacts
//   }
// }

// const addContact = async (body) => {
//   const data = await fs.readFile(contactsPath)
//   const contacts = JSON.parse(data)

//   const newContact = body;
//   newContact.id = ID;

//   if(
//     body.name === undefined ||
//     body.email === undefined ||
//     body.phone === undefined
//   )
//   return false;

//   contacts.push(newContact)

//   const updatedContacts = JSON.stringify(contacts)

//   await fs.writeFile(contactsPath, updatedContacts)

//   return newContact
// }

// const updateContact = async (contactId, body) => {
//   const data = await fs.readFile(contactsPath)
//   const contacts = JSON.parse(data)

//   const index = contacts.findIndex(el => el.id === contactId)

//   if(index > -1){
//     const updatedContact = body
//     contacts[index] = { ...contacts[index], ...updatedContact}

//     const updatedContacts = JSON.stringify(contacts)

//     await fs.writeFile(contactsPath, updatedContacts)

//     return contacts[index]
//   } else {
//     return false;
//   }
  
// }

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
//   Contact
// }
