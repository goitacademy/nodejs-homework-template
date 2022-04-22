// const fs = require('fs/promises')
const fs = require('fs/promises');
const { nanoid } = require('nanoid');
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json')

const listContacts = async () => {
   const data = await fs.readFile(contactsPath, 'utf-8');
    const list = JSON.parse(data)
    return list
}

const getContactById = async (contactId) => {
  const list = await listContacts();
  const contactById = list.find(item => item.id === contactId)
    if (!contactById) {return null }
    return contactById
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
    const contactIndex = findIndex(contacts, contactId)
    const newContacts = contacts.filter((contact, index) =>  index !== contactIndex)
   
     updateContactsList(newContacts)
    return contacts[contactIndex]
}

const addContact = async (body) => {
   const contacts = await listContacts()
    const newContact = { ...body, id: nanoid() }
    contacts.push(newContact)
     updateContactsList(contacts)
    return newContact
}

const updateContact = async (contactId, body) => { 
  const contacts = await listContacts()
   const contactIndex = findIndex(contacts, contactId)
  contacts[contactIndex] = {...body, id: contactId}
   updateContactsList(contacts);
    return contacts[contactIndex];
}

async function updateContactsList(list) {
   await fs.writeFile(contactsPath, JSON.stringify(list))
}
function findIndex(list, id) { 
  const contactIndex = list.findIndex(contact => contact.id === id)
    if (contactIndex === -1) {
        return null
  }
  return contactIndex
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
