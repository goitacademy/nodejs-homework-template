// const fs = require('fs/promises')
// const path = require('path')
// const contactsPath = path.join(__dirname, './contacts.json')
// const { v4: uuidv4 } = require('uuid')

const Contact = require('./shemas/contactsSchema')

// const listContacts = async () => {
//   const data = await fs.readFile(contactsPath, 'utf8')
//   return JSON.parse(data)
// }

const listContacts = async () => {
  const contacts = await Contact.find()
  return contacts
}

// const getContactById = async (contactId) => {
//   const contacts = await listContacts()
//   const finedContact = contacts.find(
//     (contact) => String(contact.id) === contactId
//   )
//   return finedContact
// }

const getContactById = async (contactId) => {
  const contact = await Contact.findOne({ _id: contactId })
  return contact
}

// const addContact = async (body) => {
//   const newContact = { id: uuidv4(), ...body }
//   const contacts = await listContacts()
//   contacts.push(newContact)
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
//   return newContact
// }

const addContact = async (body) => {
  const contact = await Contact.create(body)
  return contact
}

// const updateContact = async (contactId, body) => {
//   const findContact = await getContactById(contactId)
//   const updatedContact = { ...findContact, ...body }

//   if (findContact) {
//     const contacts = await listContacts()
//     const newContacts = contacts.map((contact) => (String(contact.id) === contactId ? updatedContact : contact))
//     await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2))
//     return updatedContact
//   }
// }

const updateContact = async (contactId, body) => {
  const contact = await Contact.findByIdAndUpdate({ _id: contactId }, { ...body }, { new: true })
  return contact
}

// const removeContact = async (contactId) => {
//   const deletedContact = getContactById(contactId)
//   if (deletedContact) {
//     const contacts = await listContacts()
//     const newContacts = contacts.filter(
//       (contact) => String(contact.id) !== contactId
//     )
//     await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2))
//   }
//   return deletedContact
// }

const removeContact = async (contactId) => {
  const deletedContact = await Contact.findByIdAndDelete({ _id: contactId })
  return deletedContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
