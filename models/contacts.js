const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const update = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = {
    id: Date.now(),
    ...data,
  };
  contacts.push(newContact);
  await update(contacts);
  return newContact;
};
const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const result = contacts.splice(index, 1);
  await update(contacts);
  return result;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { contactId, ...body };
  await update(contacts);
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
