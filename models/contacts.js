const fs = require("fs/promises");
const path = require("node:path");
const { v4 } = require("uuid");
const contactsPath = path.join(__dirname, "contacts.json");
const updateContacts = async (list) => {
  await fs.writeFile(contactsPath, JSON.stringify(list));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const findContact = contacts.filter((elm) => elm.id === contactId);
  if (findContact.length === 0) {
    return null;
  }
  return findContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const findIdx = contacts.findIndex((elm) => elm.id === contactId.toString());
  if (findIdx === -1) {
    return null;
  }
  const filtredContacts = contacts.filter((_, idx) => idx !== findIdx);
  updateContacts(filtredContacts);
  return contacts[findIdx];
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), ...body };
  contacts.push(newContact);
  updateContacts(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const findIdx = contacts.findIndex((elm) => elm.id === contactId.toString());
  if (findIdx === -1) {
    return null;
  }
  const updatedContact = { ...contacts[findIdx], ...body };
  contacts[findIdx] = updatedContact;
  updateContacts(contacts);
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
