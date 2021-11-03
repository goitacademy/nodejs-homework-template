const listContacts = require('./listContacts')

const getContactById = async contactId => {
  // eslint-disable-next-line no-useless-catch
  try {
    const contacts = await listContacts()

    const getContact = contacts.find(item => item.id === Number(contactId))
    if (!getContact) {
      return null
    }
    return getContact
  } catch (error) {
    throw error
  }
}

module.exports = getContactById
