const fs = require('fs')
const path = require('path')

const contactsPath = path.resolve('./db/contacts.json')
const contactList = fs.readFileSync(contactsPath, 'utf-8')
const contacts = JSON.parse(contactList)

function updateContact(contactId, name, email, phone, errorMessage) {
  const contact = contacts.find((contact) => {
    if (contact.id === contactId) {
      contact.name = name
      contact.email = email
      contact.phone = phone
      return contact
    }
  })

  if (contact == null) {
    console.log(errorMessage)
    return
  }

  fs.writeFile(contactsPath, JSON.stringify(contacts), (error) => {
    if (error) {
      return console.log(error)
    }
  })

  return contacts
}
module.exports = {
  updateContact,
}
