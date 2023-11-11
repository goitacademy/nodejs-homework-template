const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const listContact = await fs.readFile(contactPath, "utf-8");
  return JSON.parse(listContact);
};

const getContactById = async (contactId) => {
  const listContact = await listContacts();
  const contact = await listContact.find((contact) => contactId === contact.id);
  return contact || null;
};

const removeContact = async (contactId) => {
  const listContact = await listContacts();
  const deleteContactIndex = listContact.findIndex(
    (contact) => contactId === contact.id
  );
  if (deleteContactIndex === -1) {
    return null;
  }
  const [deleteContact] = listContact.splice(deleteContactIndex, 1);
  await fs.writeFile(contactPath, JSON.stringify(listContact, null, 2));
  return deleteContact;
};

const addContact = async ({ name, email, phone }) => {
  const contact = { id: nanoid(), name, email, phone };
  const listContact = await listContacts();
  listContact.push(contact);
  fs.writeFile(contactPath, JSON.stringify(listContact, null, 2));
  return contact;
};

const updateContact = async (contactId, body) => {
  const listContact = await listContacts();
  const index = listContact.findIndex((item) => contactId === item.id);
  if (index === -1) {
    return null;
  }
  listContact[index] = { ...listContact[index], ...body };
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  // updateContact,
};
