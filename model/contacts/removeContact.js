const fs = require('fs/promises')
const path = require('path')

const listContacts = require('./listContacts')
const contactsPath = path.join(__dirname, 'contacts.json')

const removeContact = async (contactId) => {
  const contacts = await listContacts()

  const contact = contacts.findIndex((person) => person.id === contactId)
  // const contact = contacts.filter((person) => person.id !== contactId)
  if (contact === -1) {
    return null
  }
  contacts.splice(contact, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contacts))

  return contacts
}

module.exports = removeContact

//= ======================= old version =============================
// function removeContact(contactId) {
//   fs.readFile(contactsPath, 'utf-8', (error, data) => {
//     if (error) {
//       throw new Error('Cannot read file')
//     }
//     const contacts = JSON.parse(data)
//     const contact = contacts.findIndex((person) => person.id === contactId)
//     // const contact = contacts.filter((person) => person.id !== contactId)
//     if (contact === -1) {
//       return null
//     }
//     contacts.splice(contact, 1)
//     console.table(contacts)
//     fs.writeFile(contactsPath, JSON.stringify(contacts))
//   })
// }
//= ========================================
