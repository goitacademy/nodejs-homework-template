const { v4 } = require('uuid')

const listContacts = require('./listContacts')
const updateContact = require('./updateContacts')

const addContact = async (name, email, phone) => {
  try {
    const newContact = {
      id: v4(),
      name,
      email,
      phone,
    }
    const contacts = await listContacts()
    contacts.push(newContact)
    await updateContact(contacts)
    return newContact
  } catch (error) {
    console.log(error)
  }
}

module.exports = addContact
