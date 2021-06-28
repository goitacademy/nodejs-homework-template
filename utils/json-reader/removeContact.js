const contactList = require('./listContacts')

const removeContact = async (contactId) => {
  try {
    const list = await contactList()
    const idx = list.findIndex(item => item.id === contactId)
    const deletedContact = list[idx]
    list.splice(idx, 1)
    return deletedContact
  } catch (error) {
    console.error(error.message)
  }
}

module.exports = removeContact
