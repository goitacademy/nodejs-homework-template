const { v4: uuidv4 } = require('uuid')
const listContacts = require('./listContacts')
const updateContact = require('./updateContacts')

const addContact = async (body) => {
  const contacts = await listContacts()
  const newContact = { id: uuidv4(), ...body }
  contacts.push(newContact)
  await updateContact(contacts)
  // console.log(newContact)
  return newContact
}
// addContact('tess', '2@mail.com', '25555')
module.exports = addContact
