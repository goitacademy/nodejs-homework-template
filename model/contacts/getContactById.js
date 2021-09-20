const listContacts = require('./listContacts')

async function getContactById(contactId) {
  try {
    const contacts = await listContacts()
    const contact = contacts.find((item) => item.id.toString() === contactId)

    if (!contact) {
      throw new Error('ID incorrect')
    }

    return contact
  } catch (error) {
    console.log(error)
  }
}

module.exports = getContactById
