const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "models", "contacts");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [deletedContact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deletedContact;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const isExist = contacts.find(
    (contact) =>
      contact.name === name &&
      contact.email === email &&
      contact.phone === phone
  );
  if (isExist) {
    console.warn("Contact with such credentials already exists");
    return;
  }
  const newContacts = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContacts);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContacts;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
