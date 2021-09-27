const contactsPath = require('./contactsPath')
const { readDataFromFile } = require('../../utils/fileOperations')

const getContactById = async (contactId) => {
  const parsedData = await readDataFromFile(contactsPath)
  if (parsedData) {
    const contactIdInteger = parseInt(contactId)
    const contactData = parsedData.find(contact => contact.id === contactIdInteger)
    return contactData
  } return false
}

module.exports = getContactById
