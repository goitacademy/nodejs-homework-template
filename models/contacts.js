const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");

  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  const data = contacts.find((contact) => contact.id === contactId);

  return data || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const removedContact = contacts.splice(index, 1);

  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return removedContact;
};

const addContact = async (body) => {
  const { name, email, phone } = body;

  const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
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

  const contact = contacts.find((contact) => contact.id === contactId);

  if (!contact) {
    return null;
  }

  const updatedContact = {
    ...contact,
    ...body,
  };

  contacts[contacts.indexOf(contact)] = updatedContact;

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
