const contactList = require('./listContacts')

const updateContact = async (contactId, body) => {
  try {
    const list = await contactList()
    const idx = list.findIndex(({ id }) => id === contactId)
    body.id = contactId
    list[idx] = body
    return body
  } catch (error) {
    console.error(error.message)
  }
}

module.exports = updateContact
