const listContacts = require('./listContacts')

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts()
    const contact = contacts.find(item => item.id === Number(contactId))
    return contact
  } catch (error) {
    console.log(error)
  }
}

module.exports = getContactById
