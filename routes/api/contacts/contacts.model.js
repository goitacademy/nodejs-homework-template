const contacts = require('../../../model/schemas/contactsSchemas.js')

const listContacts = async () => await contacts.find()

const getContactById = async (contactId) =>
  await contacts.find({ _id: contactId })

const removeContact = async (contactId) =>
  await contacts.findByIdAndRemove({ _id: contactId })

const addContact = async (newContact) => await contacts.create(newContact)

const updateContact = async (contactId, body) =>
  await contacts.findByIdAndUpdate({ _id: contactId }, body, {
    new: true,
  })

const updateStatus = async (id, body) =>
  await contacts.findByIdAndUpdate({ _id: id }, body, {
    new: true,
  })

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatus,
}
