const fsp = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
const { createHttpException } = require("../helpers");
const contactPath = path.join(__dirname, "contacts.json");

const updateContactList = async (contacts) =>
  await fsp.writeFile(contactPath, JSON.stringify(contacts, null, 2));

const getListContacts = async () => {
  const contacts = await fsp.readFile(contactPath);
  const result = JSON.parse(contacts);
  return result;
};

const getContactById = async (id) => {
  const contacts = await getListContacts();

  const contact = contacts.find((contact) => contact.id === id);
  if (!contact) {
    throw createHttpException(404, "The book is not found");
  }

  return contact;
};

const removeContact = async (id) => {
  const contacts = await getListContacts();

  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    throw createHttpException(404, "The book is not found");
  }

  contacts.splice(index, 1);

  await updateContactList(contacts);

  return contacts[index];
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await getListContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await updateContactList(contacts);

  return newContact;
};

const updateContact = async (id, body) => {
  const contacts = await getListContacts();

  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    throw createHttpException(404, "The book is not found");
  }

  contacts[index] = { id, ...body };
  await updateContactList(contacts);

  return contacts[index];
};

module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
