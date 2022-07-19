const fs = require('fs/promises')
const path = require('path');

const contactsPath = path.join(__dirname, './contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data)
  return contacts;
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(item => item.id === contactId);
  if(!contact){
      return null;
  }
  return contact;
}

const removeContact = async (contactId) => {
  const contact = await getContactById(contactId);
  if(!contact){
    return null;
  }
  const contacts = await listContacts();
  const updateContacts = contacts.filter(item => item.id !== String(contactId));
  await fs.writeFile(contactsPath, JSON.stringify(updateContacts, null, 2));
  return contact;
}

const addContact = async (body) => {
  const contacts = await listContacts();
  const lastID = Number(contacts[contacts.length - 1].id)
  const newContact = {
      id: String(lastID + 1),
      name: body.name,
      email: body.email,
      phone: body.phone,
  }
  const updateContacts = [...contacts, ...newContact]
  await fs.writeFile(contactsPath, JSON.stringify(updateContacts, null, 2))
  return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contact = contacts.find(item => item.id === contactId);
  if(!contact) {
    return null;
  }
  contact.name = body.name;
  contact.email = body.email;
  contact.phone = body.phone;
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return contact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}