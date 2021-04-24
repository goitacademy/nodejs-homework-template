const fs = require('fs')
const path = require('path')

const contactsPath = path.resolve('./model/contacts.json')
const contactList = fs.readFileSync(contactsPath, 'utf-8')
const contacts = JSON.parse(contactList)

function listContacts() {
  console.log('List of contacts: ')
  console.table(contacts)

  return contacts
}

function getContactById(contactId, errorMessage) {
  const foundContact = contacts.find(contact => {
    if (contact.id === contactId) {
      console.log(`Get contact by ID=${contactId}:`)
      console.table(contact)
      return contact
    }
  })

  if (!foundContact) {
    console.log(errorMessage)
  }

  return foundContact
}

function addContact(name, email, phone) {
  contacts.push({
    id: contacts.length + 1,
    name: name,
    email: email,
    phone: phone,
  })

  console.log('Contacts added successfully! New lists of contacts: ')
  console.table(contacts)

  fs.writeFile(contactsPath, JSON.stringify(contacts), error => {
    if (error) {
      return console.log(error)
    }
  })

  return contacts
}

function removeContact(contactId, errorMessage) {
  const newContacts = contacts.filter(contact => contact.id !== contactId)

  if (newContacts.length === contacts.length) {
    console.log(errorMessage)
    return contacts
  }

  console.log('Contact deleted successfully! New list of contacts: ')
  console.table(newContacts)

  fs.writeFile(contactsPath, JSON.stringify(newContacts), error => {
    if (error) {
      return console.log('error :', error)
    }
  })

  return newContacts
}

function updateContact(contactId, name, email, phone, errorMessage) {
  const contact = contacts.find(contact => {
    if (contact.id === contactId) {
      contact.name = name
      contact.email = email
      contact.phone = phone
      console.log(`Contact with ID ${contactId} updated!`)
      console.table(contacts)
      return contact
    }
  })

  if (contact == null) {
    console.log(errorMessage)
    return
  }

  fs.writeFile(contactsPath, JSON.stringify(contacts), error => {
    if (error) {
      return console.log(error)
    }
  })

  return contacts
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
