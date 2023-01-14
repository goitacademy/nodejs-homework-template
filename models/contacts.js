const fs = require("fs/promises");
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.resolve(__dirname, "contacts.json");

const readContacts = async () => {
  const contactsRaw = await fs.readFile(contactsPath);
  return JSON.parse(contactsRaw);
};

const writeContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  return await readContacts();
};

const getContactById = async (contactId) => {
  const contacts = await readContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  const contacts = await readContacts();
  const updatedContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  await writeContacts(updatedContacts);
};

const addContact = async (body) => {
  const id = shortid();
  const newContact = { id, ...body };

  const contacts = await readContacts();
  contacts.push(newContact);
  await writeContacts(contacts);

  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await readContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  const { name, email, phone } = body;
  if (contact) {
    contact.name = name;
    contact.email = email;
    contact.phone = phone;
  }

  await writeContacts(contacts);
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
