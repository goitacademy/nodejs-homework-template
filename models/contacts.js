const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const HttpError = require("../helpers/HttpError");

const contactsPath = path.join(__dirname, "contacts.json");
console.log(contactsPath);

const readContacts = async () => {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
};

const writeContacts = async (data) => {
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
};

const listContacts = async () => {
  return await readContacts();
};

const getContactById = async (contactId) => {
  const contacts = await readContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  if (!contact) {
    throw new HttpError(404, "Contact not found");
  }
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await readContacts();
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIndex === -1) {
    throw new HttpError(404, "Contact not found");
  }
  const [deletedContact] = contacts.splice(contactIndex, 1);
  await writeContacts(contacts);
  return deletedContact;
};

const addContact = async ({ name, email, phone }) => {
  const newContact = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };
  const contacts = await readContacts();
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await readContacts();
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIndex === -1) {
    throw new HttpError(404, "Contact not found");
  }
  contacts.splice(contactIndex, 1, { ...contacts[contactIndex], ...body });
  await writeContacts(contacts);
  return contacts[contactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
