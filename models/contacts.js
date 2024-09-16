const fs = require('fs/promises')

const { nanoid } = require("nanoid");

const path = require('path');

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

const getContactById = async (contactId) => {
  const contact = await listContacts();
  const result = contact.find((item) => item.id === contactId);
  return result || null;
}

const removeContact = async (contactId) => {
  const contact = await listContacts();
  const index = contact.findIndex((item) => item.id === contactId);
  if(index === -1) {
      return null;
  }
  const [result] = contact.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
  return result;
}

const addContact = async (data) => {
  // ...твій код. Повертає об'єкт доданого контакту.
  const contact = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };

  contact.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
  return newContact;
};

const updateContact = async (id, data) => {
  const contact = await listContacts();
  const index = contact.findIndex((item) => item.id === id);
  if(index === -1) {
    return null; 
  }
  contact[index] = {id, ...data};
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
  return contact[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
