const { v4: uuidv4 } = require('uuid')
const listContacts = require('./listContacts')
const updateContact = require('./updateContacts')

const addContact = async (data) => {
  const contacts = await listContacts()
  const newContact = { ...data, id: uuidv4() }
  contacts.push(newContact)
  await updateContact(contacts)
  // console.log(newContact)
  return newContact
}
// addContact('tess', '2@mail.com', '25555')
module.exports = addContact
