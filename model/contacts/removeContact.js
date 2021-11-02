const { readFile, writeToFile } = require('../../js')
const contactsPath = require('./supportData')

const removeContact = async (contactId) => {
  const contacts = await readFile(contactsPath)

  const filteredContacts = contacts.reduce((acc, el) => {
    Number(el.id) !== Number(contactId) ? acc.push(el) : acc
    return acc
  }, [])
  await writeToFile(contactsPath, filteredContacts)
  return filteredContacts
}

module.exports = removeContact
