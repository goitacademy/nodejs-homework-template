const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const all = await listContacts();
  const searchedContact = all.find((contact) => contact.id === contactId);
  return searchedContact || null;
};

async function removeContact(contactId) {
  const all = await listContacts();
  const contactIndex = all.findIndex((contact) => contact.id === contactId);
  if (contactIndex === -1) {
    return null;
  }
  const result = all.splice(contactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(all, null, 1));
  return result;
}

async function addContact(body) {
  const all = await listContacts();
  const newContact = {
    id: uuidv4(),
    ...body,
  };
  all.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(all, null, 1));
  return newContact;
}

async function updateContact(contactId, body) {
  const all = await listContacts();
  const contactIndex = all.findIndex((contact) => contact.id === contactId);
  if (contactIndex === -1) {
    return null;
  }
  all[contactIndex] = { contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(all, null, 1));
  return all[contactIndex];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
