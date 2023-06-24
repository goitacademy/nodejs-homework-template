const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/contacts.json");

const listContacts = async () => {
  const allContacts = await fs.readFile(contactsPath);
  return JSON.parse(allContacts);
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contact = allContacts.find((contact) => contactId === contact.id);
  return contact || null;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contactId === contact.id);
  if (index === -1) return null;
  const [result] = allContacts.splice(index, 1);
  fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return result;
};

const addContact = async (body) => {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  allContacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    allContacts[index] = { ...allContacts[index], ...body };
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return allContacts[index];
  } else {
    throw new Error("Contact not found");
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
