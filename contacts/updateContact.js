const { readFile, writeToFile } = require('../js')
const contactsPath = require('./supportData')

const updateContactById = async(id, data) => {
  const contacts = await readFile(contactsPath)
  const idx = contacts.findIndex(el => Number(el.id) === Number(id))
  if (idx === -1) {
    return null
  }
  contacts[idx] = { ...data, id }
  await writeToFile(contactsPath, contacts)
  return contacts[idx]
}

module.exports = updateContactById
