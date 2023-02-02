const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("./src/models/contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await fs.listContacts();
  const contact = contacts.find((el) => el.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((el) => el.id === contactId);
  
  if (index !== -1) {
    return null;
  }

  const deletedContact = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  
  return deletedContact[0];
};

const addContact = async (contact) => {
  const { name, email, phone } = contact;
  const contacts = await listContacts();
  contacts.push({ id: Date.now().toString(), name, email, phone });
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return contacts;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((el) => el.id === contactId);
  if (index !== -1)
    return null;
  
  contacts[index] = { ...contacts[index], ...body };

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];

};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
