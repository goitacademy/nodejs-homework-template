const { contactsPath } = require('./contactPath')

const getAllContacts = async () => {
  return await contactsPath()
}

module.exports = getAllContacts
