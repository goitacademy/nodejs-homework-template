const fsp = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
const { create_http_exception } = require("../helpers");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContactsList = async (contacts) =>
  await fsp.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const contacts = await fsp.readFile(contactsPath);
  const result = JSON.parse(contacts);
  return result;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  if (!contact) {
    throw create_http_exception(404, "Not found");
  }

  return contact;
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
  await updateContactsList(contacts);

  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    throw create_http_exception(404, "Not found");
  }

  contacts.splice(index, 1);

  await updateContactsList(contacts);
};

const updateContact = async (id, data) => {
  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    throw create_http_exception(404, "Not found");
  }

  contacts[index] = { id, ...data };
  await updateContactsList(contacts);

  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
