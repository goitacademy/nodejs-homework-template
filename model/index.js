
const Contact = require('./schemas/contact.js')

const listContacts = async () => {
  return await Contact.find({})
}

const getContactById = async (contactId) => {
  return await Contact.findOne({ _id: contactId })
}

const removeContact = async (contactId) => {
  return await Contact.findOneAndRemove({ _id: contactId })
}

const addContact = async (body) => {
  const result = await Contact.create(body)
  return result
}

const updateContact = async (contactId, body) => {
  const result = await Contact
    .findOneAndUpdate(
      contactId,
      { ...body },
      { new: true }
    )
  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
