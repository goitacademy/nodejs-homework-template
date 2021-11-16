const listContacts = require('./listContatxs')

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const contact = contacts.find(
    (contact) => String(contact.id) === String(contactId)
  );
  if (!contact) {
    return null
  }

  return contact
}

module.exports = getContactById
