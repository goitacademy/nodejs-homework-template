const db = require('./db')

// === GET all contacts ===
const listContacts = async () => {
  return db.get('contacts').value()
}

// === GET contact by ID ===
const getContactById = async contactId => {
  return db
    .get('contacts')
    .find(({ id }) => String(id) === String(contactId))
    .value()
}

// === REMOVE contact by ID ===
const removeContact = async contactId => {
  const [contact] = db
    .get('contacts')
    .remove(({ id }) => String(id) === String(contactId))
    .write()

  return contact
}

// === ADD new contact ===
const addContact = async body => {
  const contact = {
    ...body,
    ...(body.email ? {} : { email: 'fill in!' }),
  }

  db.get('contacts').push(contact).write()
  return contact
}

// === UPDATE contact ===
const updateContact = async (contactId, body) => {
  const contact = db
    .get('contacts')
    .find(({ id }) => String(id) === String(contactId))
    .assign(body)
    .value()
  db.write()
  return contact.id ? contact : null
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
