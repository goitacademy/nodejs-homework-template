const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const filepath = path.resolve("contacts", "contacts.json");

const updateContacts = (contacts) =>
  fs.writeFile(filepath, JSON.stringify(contacts, null, 2));

export const listContacts = async () => {
  const data = await fs.readFile(filepath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item = item.id === id));
  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
};

const addContact = async ({ name, number }) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    number,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
