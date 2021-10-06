const listContacts = require('./listContacts')

const getContactById = async (id) => {
  try {
    const contacts = await listContacts()
    // const idx = contacts.findIndex(contact => contact.id === id);
    const contact = contacts.find((contact) => contact.id === Number(id))
    if (!contact) {
      return null
    }
    return contact
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = getContactById
