const fs = require('fs/promises')
const path = require('path')
const { v4 } = require('uuid')

const listContacts = require('./listContacts')
const contactsPath = path.join(__dirname, 'contacts.json')

const addContact = async (name, email, phone) => {
  const contacts = await listContacts()
  const newContact = { id: v4(), name, email, phone }
  contacts.push(newContact)
  // const newContacts = [...contacts, newContact]
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  // await fs.writeFile(contactsPath, JSON.stringify(newContacts))
  return newContact
}

module.exports = addContact

//= ===================old version ======================
// function addContact(name, email, phone) {
//   fs.readFile(contactsPath, 'utf-8', (error, data) => {
//     if (error) {
//       throw new Error('Cannot read file')
//     }
//     const contacts = JSON.parse(data)
//     const newContact = { id: v4(), name, email, phone }
//     contacts.push(newContact)

//     console.log('New contact is added:')
//     console.table(contacts)

//     fs.writeFile(contactsPath, JSON.stringify(newContact))
//   })
// }
//= ====================================================
