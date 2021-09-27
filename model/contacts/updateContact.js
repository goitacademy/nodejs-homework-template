const contactsPath = require('./contactsPath')
const { readDataFromFile, writeDataToFile } = require('../../utils/fileOperations')

const updateContact = async (contactId, body) => {
  let parsedData = await readDataFromFile(contactsPath)
  if (parsedData) {
    const contactIdInteger = parseInt(contactId)
    let contactData = parsedData.find(contact => contact.id === contactIdInteger)
    if (contactData) {
      contactData = { ...contactData, ...body }
      parsedData = parsedData.filter(contactData => contactData.id !== contactIdInteger)
      parsedData.push(contactData)
      return await writeDataToFile(contactsPath, parsedData) ? contactData : false
    } else return undefined
  } return false
}

module.exports = updateContact
