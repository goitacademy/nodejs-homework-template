const fs = require('fs/promises')
const path = require('path')
const uuid = require("uuid");

const contactsPath = path.join(__dirname, './contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath,'utf-8')
  const contacts =  JSON.parse(data)
  return contacts
}

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath,'utf-8')
  const contacts =  JSON.parse(data)
  const contactById = contacts.find(contact => contact.id === contactId)

  return contactById
}

const removeContact = async (contactId) => {
  const data = await fs.readFile(contactsPath,'utf-8')
  const contacts =  JSON.parse(data)
  const contactById = contacts.find(contact => contact.id === contactId)

  if(!contactById) {
    return null;
}

const updatedContacts = contacts.filter(contact => contact.id !== contactId)
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts))

  return updatedContacts
}

const addContact = async (body) => {
  const { name, email, phone } = body;
  const newContact = {
    id: uuid.v4(),
    name,
    email,
    phone,
  };
  const data = await fs.readFile(contactsPath,'utf-8')
  const contacts = JSON.parse(data)
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

const updateContactById = async (contactId, body) => {
  const data = await fs.readFile(contactsPath, 'utf-8')
  const contacts = JSON.parse(data)
  const contactById = contacts.findIndex(contact => contact.id === contactId)
  const { name, email, phone } = body;
  
  
  if (contactById !== -1){
    contacts[contactById].name = name;
    contacts[contactById].email = email;
    contacts[contactById].phone = phone;
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts[contactById];
  } else return null;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
}
