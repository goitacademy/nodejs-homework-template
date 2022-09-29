const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "../models/contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  const parseContacts = JSON.parse(contacts);
  return parseContacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find((item) => item.id.toString() === contactId);
  if (!contactById) {
    return null;
  }
  return contactById;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), ...body };

  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id.toString() === contactId);
  if (!idx) {
    return null;
  }
  const newContactList = contacts.filter((_, index) => index !== idx);
  await updateContacts(newContactList);
  return contacts[idx];
};

const updateContactById = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id.toString() === contactId);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...body, contactId };
  await updateContacts(contacts);
  return contacts[idx];
};

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
