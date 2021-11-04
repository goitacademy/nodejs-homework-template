const fs = require('fs/promises')
const path = require('path')
const { contactsPath } = require('./contactPath')

const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await contactsPath()
  const idx = contacts.findIndex(item => item.id === contactId)
  if (idx === -1) {
    return 'Contact not found'
  }
  const renewableContact = contacts[idx]
  const nonRenewableСontacts = contacts.filter(item => item.id !== contactId)
  const isContackAlreadyExist = nonRenewableСontacts.some(contact => contact.email === email || contact.phone === phone)
  if (isContackAlreadyExist) {
    return 'Contact already exist'
  }
  const createUpdatedContact = (name = renewableContact.name, email = renewableContact.email, phone = renewableContact.phone) => {
    return {
      id: contactId,
      name,
      email,
      phone
    }
  }
  contacts[idx] = createUpdatedContact(name, email, phone)
  await fs.writeFile(path.join(__dirname, 'contacts.json'), JSON.stringify(contacts, null, 2))
  return contacts[idx]
}

module.exports = updateContact
