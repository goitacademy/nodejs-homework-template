const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const patch = require("path");
const contactPath = patch.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactPath);
  return JSON.parse(contacts) || null;
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const rezult = contacts.find((contact) => contact.id === id);
  return rezult || null;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    ...body,
    id: nanoid(),
  };
  contacts.push(newContact);
  fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  console.log("index: ", index);
  if (index === -1) {
    return null;
  }
  const rezult = contacts.splice(index, 1);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return rezult;
};

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...contacts[index], ...body };
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
