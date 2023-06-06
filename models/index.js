const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

const updateContact = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8")
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    console.log("Contact not found.");
    return null;
  }
  const removedContact = contacts.splice(index, 1)[0];
  await updateContact(contacts);
  return removedContact;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const existingContact = contacts.find(
    (contact) =>
      contact.name === name &&
      contact.email === email &&
      contact.phone === phone
  );

  if (existingContact) {
    console.log("Contact already exists:", existingContact);
    return existingContact;
  }
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await updateContact(contacts);
  return newContact;
};

const updateContactById = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    console.log("Contact not found.");
    return null;
  }
  contacts[index] = { ...contacts[index], ...body };
  await updateContact(contacts);
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
  contactsPath,
};
