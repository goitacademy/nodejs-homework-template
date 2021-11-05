const fs = require("fs/promises");
const path = require("path");
const uniqueId = require("uniqid");

const listContacts = async () => {
  const contactsData = await fs.readFile(
    path.join(__dirname, "contacts.json"),
    "utf8",
  );
  const data = JSON.parse(contactsData);
  return data;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((cont) => cont.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const indexContact = contacts.findIndex((el) => el.id === contactId);
  if (!contact) {
    return null;
  }
  const removeContact = contacts.splice(indexContact, 1);
  return removeContact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { ...body, id: uniqueId() };
  contacts.push(newContact);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idContact = contacts.findIndex((item) => item.id === contactId);
  if (idContact === -1) {
    return null;
  }
  contacts[idContact] = { ...body, contactId };
  return contacts[idContact];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
