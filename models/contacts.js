const { writeFile } = require("fs");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((el) => el.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const removedIndex = contacts.findIndex((el) => el.id === contactId);
  if (removedIndex === -1) {
    return null;
  }
  const removedContact = contacts.splice(removedIndex, 1)[0];
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removedContact;
}

async function addContact(newContact) {
  const contacts = await listContacts();
  const addedContact = {
    id: nanoid(),
    ...newContact,
  };
  contacts.push(addedContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return addedContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const updatedIndex = contacts.findIndex((el) => el.id === contactId);
  if (updatedIndex === -1) {
    return null;
  }
  contacts[updatedIndex] = { contactId, ...body };
  await writeFile(contacts);
  return contacts[updatedIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
