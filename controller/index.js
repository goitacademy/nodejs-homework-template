const {
  getContacts,
  findContactById,
  addNewContact,
  deleteContact,
  modifyContact,
  updateFavStatus,
} = require('../services/api-contacts')

const listContacts = async (req, res, next) => {
  const contacts = await getContacts()
  return contacts
}

const getContactById = async contactId => {
  const result = findContactById(contactId)
  return result
}

const addContact = async body => {
  const result = await addNewContact(body)
  return result
}

const removeContact = async contactId => {
  return await deleteContact(contactId)
}

const updateContact = async (contactId, body) => {
  const result = await modifyContact(contactId, body)
  return result
}

const updateStatusContact = async (contactId, body) => {
  const result = await updateFavStatus(contactId, body)
  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}
