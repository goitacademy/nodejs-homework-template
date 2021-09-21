const { v4 } = require('uuid')
const contacts = require('./contacts.json')
const rewriteContacts = require('./rewriteContacts')

const addContact = async ({ name, email, phone }) => {
  const newContact = {
    id: v4(),
    name,
    email,
    phone
  }

  contacts.push(newContact)
  await rewriteContacts(contacts)

  return newContact
}

module.exports = addContact
