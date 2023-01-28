const fs = require("fs/promises");
const path = require("path");

const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  return JSON.parse(await fs.readFile(contactsPath, "utf-8"));
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }

  return result;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();

  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const nevContacts = contacts.filter(({ id }) => id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(nevContacts, null, 2));
  return nevContacts;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const id = contacts.findIndex((item) => item.id === contactId);
  console.log(id);
  if (!body) {
    return null;
  }
  if (id === -1) {
    return;
  }

  contacts[id] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[id];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
