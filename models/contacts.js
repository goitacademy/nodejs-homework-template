const fs = require("fs/promises");
const contactsPath = require("../path");
const { v4 } = require("uuid");

// const updateContacts = async (contacts) => {
//   await fs.writeFile(contactsPath, JSON.stringify(contacts));
// };

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const data = await listContacts();

  const contact = data.find((contact) => contact.id === contactId);
  if (!contact) return null;
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const newContacts = await contacts.filter((_, index) => index !== idx);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return contacts[idx];
};

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), ...data };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const contacttIndex = allContacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (contacttIndex === -1) {
    return null;
  }
  allContacts[contacttIndex] = { contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return allContacts[contacttIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
