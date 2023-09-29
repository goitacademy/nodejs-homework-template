const Contact = require('../schemas/contacts')
const handleError = require('../helpers/handleError')

const listContacts = async () => {
  return await handleError(async () => {
    const data = await Contact.find({})
    return data
  })
}

const getContactById = async contactId => {
  return handleError(async () => {
    const contacts = await Contact.findOne({ _id: contactId })
    // const contact = contacts.find(({ id }) => id.toString() === contactId)
    return contacts
  })
}

const removeContact = async (contactId) => {
  return handleError(async () => {
    const contacts = await Contact.findByIdAndRemove({
      _id: contactId,
    })
    // const indexToRemove = contacts.findIndex((contact) => contact.id.toString() === contactId)
    return contacts
  })
}

const addContact = async (body) => {
  return handleError(async () => {
    const contacts = await Contact.create(body)
    return contacts
  })
}

const updateContact = async (contactId, body) => {
  return await handleError(async () => {
    const contact = await Contact.findByIdAndUpdate(
      { _id: contactId },
      { ...body },
      { new: true }
    )
    return contact
  })
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
