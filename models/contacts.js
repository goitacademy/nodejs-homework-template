const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "contacts.json");

async function readContacts() {
  const contactsRaw = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactsRaw);
  return contacts;
}

async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

const listContacts = async () => {
  const contacts = await readContacts();
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await readContacts();
  const result = contacts.find((contact) => contact.id === contactId);

  return result || null;
};

const addContact = async ({ name, email, phone }) => {
  const id = nanoid();
  const contact = {
    id,
    name,
    email,
    phone,
  };
  const contacts = await readContacts();
  contacts.push(contact);
  await writeContacts(contacts);
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await readContacts();
  const updatedContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  await writeContacts(updatedContacts);
};

const updateContact = async (id, { name, email, phone }) => {
  const contacts = await readContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, name, email, phone };
  await writeContacts(contacts);
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
