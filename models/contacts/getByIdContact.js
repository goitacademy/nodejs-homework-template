const readData = require('./readData')

const getByIdContact = async contactId => {
  const contacts = await readData()
  const [result] = contacts.filter(contact => String(contact.id) === contactId)
  return result
}

module.exports = getByIdContact
