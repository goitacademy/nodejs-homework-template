const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const writeFile = async (data) => {
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
};

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
  await writeFile(contacts);
  return removedContact;
}

async function addContact(newContact) {
  const contacts = await listContacts();
  const addedContact = {
    id: nanoid(),
    ...newContact,
  };
  contacts.push(addedContact);
  await writeFile(contacts);
  return addedContact;
}

async function updateContact(id, body) {
  const contacts = await listContacts();
  const updatedIndex = contacts.findIndex((el) => el.id === id);
  if (updatedIndex === -1) {
    return null;
  }
  contacts[updatedIndex] = { id, ...body };
  await writeFile(contacts);
  return contacts[updatedIndex];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
