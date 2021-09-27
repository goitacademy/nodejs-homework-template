const listContacts = require('./listContacts')
const updateContacts = require('./updateContacts')

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts()
    const index = contacts.findIndex((item) => item.id === Number(contactId))

    if (!index) {
      throw new Error('ID incorrect')
    }
    contacts.splice(index, 1)
    await updateContacts(contacts)
    console.log(`Contact #${contactId} was removed`)
  } catch (error) {
    console.log(error)
  }
}

module.exports = removeContact
