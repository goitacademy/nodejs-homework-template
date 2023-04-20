const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join("models/contacts.json");

const readContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  return contacts;
};

const updateContacts = async contacts => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
};

const listContacts = async () => {
  const contacts = await readContacts();
  return contacts;
};

const getContactById = async contactId => {
  const contacts = await readContacts();

  return contacts.filter(contact => contact.id === contactId);
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const updatedList = contacts.filter(contact => contact.id !== contactId);

  const deletedContact = contacts.find(contact => contact.id === contactId);
  await fs.writeFile(contactsPath, JSON.stringify(updatedList));

  return deletedContact;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(8), name, email, phone };

  contacts.push(newContact);
  await updateContact(contacts);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(contact => contact.id === contactId);

  if (idx !== -1) {
    contacts[idx] = { ...contacts[idx], ...body };
    await updateContacts(contacts);

    return contacts[idx];
  }

  return null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContacts,
  updateContact,
};
