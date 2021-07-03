const {
  getContacts,
  findContactById,
  addNewContact,
  deleteContact,
  modifyContact,
  updateStatusFavorite,
} = require('../services/serviceContacts')

async function listContacts({ page, limit }) {
  const contacts = await getContacts({ page, limit })

  return contacts
}

async function getContactById(contactId) {
  const contact = findContactById(contactId)
  return contact
}

async function removeContact(contactId) {
  return await deleteContact(contactId)
}

async function addContact(body) {
  const contact = await addNewContact(body)
  return contact
}

const updateContact = async (contactId, body) => {
  const contact = await modifyContact(contactId, body)
  return contact
}

const updateStatusContact = async (contactId, body) => {
  const result = await updateStatusFavorite(contactId, body)
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
