const fs = require("fs/promises");
const path = require("path");
const crypto = require('crypto');

const contactsPath = path.resolve("models", "contacts.json");

const updateContacts = async (newContacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const result = allContacts.find((item) => item.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = allContacts.splice(index, 1);
  await updateContacts(allContacts);
  return result;
};

const addContact = async (body) => {
  const allContacts = await listContacts();
  const { name, email, phone } = body;
  const result = { id: crypto.randomUUID(), name, email, phone };
  allContacts.push(result);
  await updateContacts(allContacts);
  return result;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }

  const result = { ...allContacts[index], ...body };
  allContacts[index] = result;
  await updateContacts(allContacts);
  return result;
};



module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};