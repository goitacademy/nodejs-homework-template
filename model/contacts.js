const Contact = require('./schemas/contacts')

// === ADD new contact ===
const addContact = async body => {
  return Contact.create(body)
}

// === GET all contacts ===
const listContacts = async () => {
  return await Contact.find({})
}

// === GET contact by ID ===
const getContactById = async contactId => {
  return await Contact.findOne({ _id: contactId })
}

// === UPDATE contact ===
const updateContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true },
  )
}

// === REMOVE contact by ID ===
const removeContact = async contactId => {
  return await Contact.findByIdAndRemove({ _id: contactId })
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
