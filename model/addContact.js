const listContacts = require('./listContacts')
const updateContacts = require('./updateContacts')
const { v4 } = require('uuid')

const addContact = async (body) => {
  const newContact = {
    id: v4(),
    ...body
  }
  const list = await listContacts()
  list.push(newContact)
  updateContacts(list)
  return newContact
}

module.exports = addContact
