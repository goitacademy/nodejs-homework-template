const fs = require("fs/promises");
const path = require("node:path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("models", "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (id) => {
  const allContacts = await listContacts();
  const contactById = allContacts.find((contact) => contact.id === id);
  return contactById;
};

const removeContact = async (id) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === id);

  const deletedContact = allContacts[index];

  if (index !== -1) {
    allContacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  }
  return deletedContact;
};

const addContact = async ({ name, email, phone }) => {
  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };
  const allContacts = await listContacts();
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
};

const updateContact = async (id, { name, email, phone }) => {
  const allContacts = await listContacts();

  const index = allContacts.findIndex((contact) => contact.id === id);

  if (index === -1) {
    return null;
  }
  allContacts[index] = { ...allContacts[index], name, email, phone };

  fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return allContacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
