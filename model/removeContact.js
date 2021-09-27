const listContacts = require('./listContacts')
const updateContacts = require('./updateContacts')

async function removeContact(contactId) {
  try {
    const contacts = await listContacts()
    const idx = contacts.findIndex((item) => item.id.toString() === contactId)

    if (!idx) {
      throw new Error('ID incorrect')
    }

    contacts.splice(idx, 1)
    await updateContacts(contacts)
    return 'Success remove'
  } catch (error) {
    console.log(error)
  }
}

module.exports = removeContact
