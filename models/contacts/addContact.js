const fs = require('fs/promises')
const path = require('path')
const { contactsPath } = require('./contactPath')
const contactGenerator = require('./contactGenerator')

const addContact = async ({ name, email, phone }) => {
  const contacts = await contactsPath()

  const isContackAlreadyExist = contacts.some(contact => contact.email === email || contact.phone === phone)

  if (isContackAlreadyExist) {
    return null
  }

  const newContact = contactGenerator(name, email, phone)

  contacts.push(newContact)
  await fs.writeFile(path.join(__dirname, 'contacts.json'), JSON.stringify(contacts, null, 2))
  return newContact
}

module.exports = addContact
