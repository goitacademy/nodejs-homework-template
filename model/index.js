const { Contact } = require('./Schemas/contact')
// =======================================list============================
async function listContacts() {
  const result = await Contact.find({})
  return result
}

// =====================================get================================
const getContactsById = async (contactId) => {
  const result = await Contact.findById(contactId)
  if (!result) {
    return null
  }
  return result
}

// =====================================add================================
const addContact = async (body) => {
  const result = await Contact.create(body)
  return result
}

// =====================================update by id================================
const updateContactById = async (contactId, body) => {
  const result = await Contact.findByIdAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true }
  )
  return result
}

// =====================================remove================================
const removeContact = async (contactId) => {
  const result = await Contact.findByIdAndRemove({ _id: contactId })
  if (result === -1) {
    return null
  }
  return result
}

// =====================================favorite================================
const updateStatusContact = async (contactId, body) => {
  const result = await Contact.findByIdAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true }
  )
  return result
}

module.exports = {
  listContacts,
  getContactsById,
  addContact,
  updateContactById,
  removeContact,
  updateStatusContact,
}
