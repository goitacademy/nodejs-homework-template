const Contact = require('../schemas/contacts')

const listContacts = async () => {
  const result = await Contact.find({})
  return result
}

const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findOne({ _id: contactId })
    return contact
  } catch {
    return {}
  }
}

const removeContact = async (contactId) => {
  try {
    const contact = await Contact.findByIdAndRemove({ _id: contactId })
    return contact
  } catch {
    return null
  }
}

const addContact = async (body) => {
  try {
    const response = await Contact.create(body)
    return response
  } catch {
    return {}
  }
}

const updateContact = async (contactId, body) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      { _id: contactId },
      { ...body },
      { new: true }
    )
    return updatedContact
  } catch {
    return {}
  }
}

const updateStatusContact = async (contactId, body) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      { _id: contactId },
      { ...body },
      { new: true }
    )
    return updatedContact
  } catch {
    return {}
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
}
