const { v4 } = require('uuid')
const getALl = require('./getAll')
const updateContacts = require('./updateContacts')

const add = async (data) => {
  const contacts = await getALl()
  const newContact = { id: v4(), ...data }
  contacts.push(newContact)
  await updateContacts(contacts)
  return newContact
}

module.exports = add
