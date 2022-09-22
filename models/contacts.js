const fs = require('fs/promises');
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");
const updateContacts = async (contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");

  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const id = String(contactId);
  const contact = contacts.find(item => item.id === id);

  return contact || null;
};

const removeContact = async (contactId) => { 
  const contacts = await listContacts();
  const id = String(contactId);
  const index = contacts.findIndex(item => item.id === id);

  if (index === -1) {
      return null;
  };

  const [removedContact] = contacts.splice(index, 1);
  await updateContacts(contacts);

  return removedContact;
};

const addContact = async ({ name, email, phone }) => { 
  const contacts = await listContacts();
  const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
  };

  contacts.push(newContact);
  await updateContacts(contacts);

  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => { 
  const contacts = await listContacts();
  const id = String(contactId);
  const index = contacts.findIndex(item => item.id === id);

  if (index === -1) {
    return null;
  };

  contacts[index] = { id, name, email, phone };
  await updateContacts(contacts);

  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};