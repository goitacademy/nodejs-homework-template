const { listContacts } = require('./listContacts');

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const contact = contacts.find((contact) => String(contact.id) === String(contactId))
  console.log(contact)
  return contact
}

module.exports = { getContactById }
