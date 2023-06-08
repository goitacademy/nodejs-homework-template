const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const response = await fs.readFile(contactsPath);

    return JSON.parse(response);
  } catch (err) {}
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  return contacts.find((contact) => contact.id === contactId) || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) return null;
  const [result] = contacts.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();

  const newContact = { id: nanoid(), name, email, phone };

  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) return null;
  const [result] = contacts.splice(index, 1);

  const updatedContact = { ...result, ...body };

  contacts.push(updatedContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
