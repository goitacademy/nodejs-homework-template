const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.error("Error while reading contacts:", error);
    throw new Error("Could not read contacts file");
  }
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const newContacts = contacts.filter((item) => item.id !== id);

  if (contacts.length === newContacts.length) {
    return null;
  }
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
  const oldContacts = contacts.filter((item) => item.id === id);

  return oldContacts;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(5),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(({ id }) => id === contactId);

  if (contactIndex === -1) {
    return null;
  }

  contacts[contactIndex] = { id: contactId, ...body };

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  const contactUpdated = contacts[contactIndex];

  return contactUpdated;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
