const contactsPath = require('./contactsPath')
const { readDataFromFile } = require('../../utils/fileOperations')

const listContacts = async () => {
  const parsedData = await readDataFromFile(contactsPath)
  if (parsedData) return parsedData
  else return false
}

module.exports = listContacts
