const path = require('path');
const fs = require('fs/promises');

const contactsPath = path.join(__dirname, "../models/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find(item => item.id === String(contactId));
  if(!contactById) {
      return null;
  }
  return contactById;
}

const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === String(id));
  if(index === -1) {
      return null;
  }
  const newContacts = contacts.filter((_, id) => id !== index);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return contacts[index];
}


const addContact = async (body) => {
  const { name, email, phone, id } = body;
  const contacts = await listContacts();
  const newContact = {
      name: name,
      email: email,
      phone: phone,
      id: id
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

const updateContact = async (id, body) => {

  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === String(id));
  if(index === -1) {
    return null;
  }
  contacts[index] = {...body, id};
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[index];

}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}