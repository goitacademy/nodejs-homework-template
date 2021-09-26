const contacts = require("./contacts.json");
const { v4 } = require("uuid");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => contacts;

const getContactById = async (id) => {
  const contacts = await listContacts();
  const contactIdx = contacts.findIndex(
    (contact) => contact.id === (Number(id) || id)
  );
  if (contactIdx === -1) {
    return null;
  }
  return contacts[contactIdx];
};

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = { ...data, id: v4() };
  contacts.push(newContact);
  await updateContact(contacts);
  return newContact;
};
const removeContact = async (id) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(
    (contact) => contact.id === (Number(id) || id)
  );
  if (idx === -1) {
    return null;
  }
  contacts.splice(idx, 1);
  await updateContact(contacts);
  return true;
};
const updateContactId = async (id, data) => {
  const contacts = await listContacts();
  const updateId = contacts.findIndex(
    (contact) => contact.id === (Number(id) || id)
  );
  if (updateId === -1) {
    return null;
  }
  contacts[updateId] = { ...contacts[updateId], ...data };
  await updateContact(contacts);
  return contacts[updateId];
};
const updateContact = async (body) => {
  await fs.writeFile(contactsPath, JSON.stringify(body));
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactId,
};
