const { readFile, writeToFile } = require('../../js')
const contactsPath = require('./supportData')

const addContact = async (name, email, phone) => {
  const contacts = await readFile(contactsPath)
  const id = contacts.length
  const rightId = contacts.find(el => Number(el.id) === id)
  const newContact = { id: rightId ? id + 2 : id + 1, name, email, phone }

  contacts.push(newContact)

  await writeToFile(contactsPath, contacts)
  return newContact
}

module.exports = addContact
