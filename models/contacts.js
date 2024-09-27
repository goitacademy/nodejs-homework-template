const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
const HttpError = require("../helpers/HttpError");
const encoding = "utf8";
const contactsPath = path.join(__dirname, "./contacts.json");
const readContacts = async () => {
  const contacts = await fs.readFile(contactsPath, encoding);
  const parsedContacts = JSON.parse(contacts);
  return parsedContacts;
};

const listContacts = async () => {
  return readContacts();
};

const getContactById = async (contactId) => {
  const contacts = await readContacts();

  return contacts.find((contact) => contact.id === contactId);
};

const removeContact = async (contactId) => {
  const contacts = await readContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (!~index) {
    return false;
  }
  contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return true;
};

const addContact = async (body) => {
  const contacts = await readContacts();
  const newContact = { id: nanoid(), ...body };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await readContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  // console.log(contact);
  if (!contact) {
    throw HttpError(404, "Contact not found");
  }
  const updatedContact = { ...contact, ...body };
  const index = contacts.findIndex((contact) => contact.id === contactId);
  contacts.splice(index, 1, updatedContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
