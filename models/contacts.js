const fsp = require('fs/promises')
const { nanoid } = require('nanoid')
const path = require('path')

const contactsPath = path.join(__dirname, '/contacts.json')

const listContacts = async () => {
  const contacts = await fsp.readFile(contactsPath)
  const parsed = JSON.parse(contacts)
  
    return(parsed)
}

const getContactById = async (contactId) => {
  const contacts = await listContacts()
    const desired = contacts.find(contact => contact.id === contactId)

    return desired
}

const addContact = async (body) => {
  const {name, email, phone } = body
  const newContact = {id: nanoid(),
    name,
    email,
    phone
  }
  const contacts = await listContacts()
    contacts.push(newContact)
    fsp.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
}

function checkContactById(contactsArray, id) {
  for (let i = 0; i < contactsArray.length; i++) {
    if (contactsArray[i].id === id) {
      return true;
    }
  }
  return false;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const hasContact = checkContactById(contacts, contactId)
  if (hasContact === true) {
    const filtered = contacts.filter(contact => contact.id !== contactId)
    fsp.writeFile(contactsPath, JSON.stringify(filtered, null, 2))
    return true
  } else {
    return false
  }
}


const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
    const index = contacts.findIndex(contact => contact.id === contactId)
  if (index !== -1) {
      if (body.name) {
        contacts[index].name = body.name;
      } if (body.email) {
        contacts[index].email = body.email;
      } if (body.phone) {
        contacts[index].phone = body.phone;
      }
    fsp.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return true
  } else {
    return false
}
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
