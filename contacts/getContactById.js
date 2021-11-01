const { readFile } = require('../js')
const contactsPath = require('./supportData')

const getContactById = async (contactId) => {
  const data = await readFile(contactsPath)
  const neededContact = data.find((el) => Number(el.id) === Number(contactId))

  if (neededContact) {
    return neededContact
  }
  return null
}

module.exports = getContactById
