const fs = require('fs/promises');
const path = require('path')
const {v4} = require("uuid");

const filePath = path.join(__dirname, 'contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(filePath)
    const list = JSON.parse(data)
    return list;
}

const getContactById = async (contactId) => {
  const data = await listContacts()
  const contactById = await data.find(item => item.id === contactId)
  return contactById
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const idx =  contacts.findIndex(item => item.id === contactId)
    if (idx === -1) {
        return null
    }
    const contactsAfterDelete = await contacts.filter((_, index) => index !== idx)
    await fs.writeFile(filePath, JSON.stringify(contactsAfterDelete))
    return contacts[idx];
}

const addContact = async (body) => {
    const contacts = await listContacts()
    const newContact = {...body, id: v4()};
    contacts.push(newContact)
  await fs.writeFile(filePath, JSON.stringify(contacts))
  return newContact;
}

const updateContact = async (contactId, body) => {
  const data = await listContacts()
  const contactById = await data.find(item => item.id === contactId)
  if(contactById === -1){
        return null;
  }
  const updatedContacts = await data.map(contact => {
    if (contact.id === contactId) {
      return {...contact, ...body}
    }
    return contact
  })

  data[contactById] = { ...body, contactId }
  await fs.writeFile(filePath, JSON.stringify(updatedContacts))
  return data[contactById]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
