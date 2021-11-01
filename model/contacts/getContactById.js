const listContacts = require('./listContacts')

const getContactById = async contactId => {
  // eslint-disable-next-line no-useless-catch
  try {
    const contacts = await listContacts()
    const getContact = contacts.find(item => item.id === contactId)

    if (!getContact) {
      throw new Error(`Contact with id=${contactId} not found`)
    }
    console.table(getContact)
    return getContact
  } catch (error) {
    throw error
  }
}

module.exports = getContactById
