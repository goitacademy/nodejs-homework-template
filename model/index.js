const Contact = require('./schemas/schContact')

const listContacts = async () => {
  return await Contact.find({})
}

const getContactById = async (contactId) => {
  return await Contact.findOne({ _id: contactId })
}

const removeContact = async (contactId) => {
  return await Contact.findByIdAndRemove({ _id: contactId })
}

const addContact = async (body) => {
  const result = await Contact.create(body)
  return result._doc
}

const updateContact = async (contactId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true }
  )
  return { updated: updatedContact, updateStatus: true }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
}
