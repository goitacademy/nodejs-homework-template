const Contact = require('../schemas/contact')

const listContacts = async () => {
  const contacts = await Contact.find()
  return contacts
}

const getContactById = async (contactId) => {
  const contact = await Contact.findById({ _id: contactId })
  return contact
}

const removeContact = async (contactId) => {
  const result = await Contact.findByIdAndRemove({ _id: contactId })
  return result
}

const addContact = async (body) => {
  const result = await Contact.create(body)
  return result
}

const updateContact = async (contactId, body) => {
  const { value: result } = await Contact.findByIdAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true })
  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}
