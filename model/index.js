const contacts = require("./contacts.json");
const { v4 } = require("uuid");
const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const getContacts = async () => {
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await getContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  const contact = contacts.find((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  return contacts[idx];
};

const removeContact = async (contactId) => {
  const allContacts = await getContacts();
  const idx = allContacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  allContacts.splice(idx, 1);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return true;
};

const addContact = async (body) => {
  const allContacts = await getContacts();
  const newId = v4();

  const newContact = {
    id: newId,
    name: body.name,
    email: body.email,
    phone: body.phone,
  };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const allContacts = await getContacts();

  const idx = allContacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  allContacts[idx] = { ...allContacts[idx], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return allContacts[idx];
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
