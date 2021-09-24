// const fs = require('fs/promises')
// const path = require('path')
// const { v4 } = require('uuid')

// const contactsPath = path.join(__dirname, 'db', 'contacts.json')

// const updateContacts = async contacts => {
//   await fs.writeFile(contactsPath, JSON.stringify(contacts))
// }

// const listContacts = async () => {
//   try {
//     const data = await fs.readFile(contactsPath)
//     const contacts = JSON.parse(data)
//     return contacts
//   } catch (error) {
//     error.massage = 'Cannot read contacts file'
//     throw error
//   }
// }

// const getContactById = async (contactId) => {
//   // eslint-disable-next-line no-useless-catch
//   try {
//     const contacts = await listContacts()
//     const contact = contacts.find(item => item.id.toString() === contactId)
//     if (!contact) {
//       throw new Error('Not valid')
//     }
//     return contact
//   } catch (error) {
//     throw error
//   }
// }

// const removeContact = async (contactId) => {
//   // eslint-disable-next-line no-useless-catch
//   try {
//     const contacts = await listContacts()
//     const index = contacts.findIndex(item => item.id.toString() === contactId)
//     if (!index) {
//       throw new Error('Id incorect')
//     }
//     contacts.splice(index, 1)
//     await updateContacts(contacts)
//     return 'Delete'
//   } catch (error) {
//     throw error
//   }
// }

// const addContact = async (name, email, phone) => {
//   // eslint-disable-next-line no-useless-catch
//   try {
//     const contacts = await listContacts()
//     const newContact = { id: v4(), name, email, phone }
//     contacts.push(newContact)
//     await updateContacts(contacts)
//     return newContact
//   } catch (error) {
//     throw error
//   }
// }
// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
// }
