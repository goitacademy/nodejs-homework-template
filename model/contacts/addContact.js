const { customAlphabet } = require('nanoid')

const contactsPath = require('./contactsPath')
const { readDataFromFile, writeDataToFile } = require('../../utils/fileOperations')

const nanoid = customAlphabet('1234567890', 5)

const addContact = async (body) => {
  const contactData = { id: parseInt(nanoid()), ...body }
  const parsedData = await readDataFromFile(contactsPath)
  if (parsedData) {
    parsedData.push(contactData)
    return await writeDataToFile(contactsPath, parsedData) ? contactData : false
  } return false
}

module.exports = addContact
