const readData = require('./readData')

const getContactById = async (contactId) => {
  const contacts = await readData()

  const [result] = contacts.filter((contact) => JSON.stringify(contact.id).trim() === contactId)
  return result
}

module.exports = getContactById
