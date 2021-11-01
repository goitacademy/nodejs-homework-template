const { readFile } = require('../js')
const contactsPath = require('./supportData')

const listContacts = async () => {
  const data = await readFile(contactsPath)
  return data
}

module.exports = listContacts
