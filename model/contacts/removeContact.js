const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.resolve('./db/contacts.json')

const { getListContacts } = require('./getListContacts')
const { getById } = require('./geById')

const removeContact = async (contactId) => {
  const contacts = await getListContacts()
  const contact = await getById(contactId)

  if (!contact) {
    return undefined
  }
  const newContactsList = contacts.filter((item) => item.id !== Number(contactId))

  await fs.writeFile(contactsPath, JSON.stringify(newContactsList), 'utf-8')

  return contact
}

module.exports = { removeContact }
