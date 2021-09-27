const contactsPath = require('./contactsPath')
const { readDataFromFile, writeDataToFile } = require('../../utils/fileOperations')

const removeContact = async (contactId) => {
  let parsedData = await readDataFromFile(contactsPath)
  if (parsedData) {
    const contactIdInteger = parseInt(contactId)
    if (parsedData.some(contactData => contactData.id === contactIdInteger)) {
      parsedData = parsedData.filter(contactData => contactData.id !== contactIdInteger)
      return !!await writeDataToFile(contactsPath, parsedData)
    } else return undefined
  } return false
}

module.exports = removeContact
