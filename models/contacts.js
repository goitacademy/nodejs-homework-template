const fs = require("fs").promises;
const { nanoid } = require("nanoid");

const contactsPath = "models/contacts.json";

const updateContacts = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

async function listContacts() {
  const contacts = await fs.readFile(contactsPath, "utf-8");

  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();

  return contacts.find(({ id }) => id === contactId) || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const removeIndex = contacts.findIndex(({ id }) => id === contactId);

  if (removeIndex === -1) return null;

  const [removedContact] = contacts.splice(removeIndex, 1);

  await updateContacts(contacts);

  return removedContact;
}

async function addContact(body) {
  const contacts = (await listContacts()) || [];
  const contactToAdd = { id: nanoid(), ...body };

  contacts.push(contactToAdd);

  await updateContacts(contacts);

  return contactToAdd;
}

async function updateContact(contactId, body) {
  const contacts = (await listContacts()) || [];
  const updateIndex = contacts.findIndex(({ id }) => id === contactId);

  if (updateIndex === -1) return null;

  const contactToUpdate = { ...contacts[updateIndex], ...body };

  contacts.splice(updateIndex, 1, contactToUpdate);

  await updateContacts(contacts);

  return contactToUpdate;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
