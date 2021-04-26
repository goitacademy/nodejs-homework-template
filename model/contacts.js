const Contact = require('./schemas/contact')

const listContacts = async () => {
  const results = await Contact.find()
  return results
}

const getContactById = async (contactId) => {
  const result = await Contact.findOne({ _id: contactId })
  return result
}

const removeContact = async (contactId) => {
  const result = await Contact.findByIdAndRemove({ _id: contactId })
  return result
}

const addContact = async (body) => {
  try {
    const result = await Contact.create(body)
    return result
  } catch (e) {
    if (e.name === 'ValidationError') {
      e.status = 400
    }
    throw e
  }
}

const updateContact = async (contactId, body) => {
  const result = await Contact.findByIdAndUpdate(
    { _id: contactId },
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
  updateContact
}
