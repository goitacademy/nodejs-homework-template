const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, {
    encoding: "utf-8",
  });
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const result = data.find((i) => i.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const index = data.findIndex((i) => i.id === contactId);

  if (index === -1) {
    return null;
  }
  const [removed] = data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return removed;
};

const addContact = async (body) => {
  const data = await listContacts();
  const newContact = { id: crypto.randomUUID(), ...body };
  data.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const data = await listContacts();
  const index = data.findIndex((i) => i.id === contactId);
  if (index === -1) {
    return null;
  }

  data[index] = { id: contactId, ...body };

  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return data[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
