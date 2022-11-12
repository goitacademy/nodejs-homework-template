const fs = require('fs/promises')
const path = require('path')

const getMaxId = (data) => {
  const idList = data.map(contact => contact.id)
  return Math.max(...idList) + 1
}

const listContacts = async () => {
  const contacts = await fs.readFile(path.join(__dirname, 'contacts.json'))
  return JSON.parse(contacts)
}

const getContactById = async (contactId) => {
  const contacts = await fs.readFile(path.join(__dirname, 'contacts.json'))
  return JSON.parse(contacts).filter(contact => contact.id === contactId)
}

const removeContact = async (contactId) => {
  const contacts = await fs.readFile(path.join(__dirname, 'contacts.json'))
  const newContacts = JSON.parse(contacts).filter(contact => contact.id !== contactId)
  await fs.writeFile(path.join(__dirname, 'contacts.json'), JSON.stringify(newContacts))
  return newContacts
}

const addContact = async (name, email, phone) => {
  const contacts = await fs.readFile(path.join(__dirname, 'contacts.json'))
  const parsedContacts = JSON.parse(contacts)
  const id = getMaxId(parsedContacts).toString()
  parsedContacts.push({id: id, name: name, email: email, phone: phone})
  await fs.writeFile(path.join(__dirname, 'contacts.json'), JSON.stringify(parsedContacts))
  //console.log("+")
  return parsedContacts
}

const updateContact = async (contactId, body) => {
  const contacts = await fs.readFile(path.join(__dirname, 'contacts.json'))
  const parsedContacts = JSON.parse(contacts)
  parsedContacts[parsedContacts.findIndex(contact => contact.id === contactId)] = {id: contactId, name: body.name, email: body.email, phone: body.phone}
  await fs.writeFile(path.join(__dirname, 'contacts.json'), JSON.stringify(parsedContacts))
  return parsedContacts
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
