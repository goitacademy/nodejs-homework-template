const asyncHandler = require("./asyncHandler");
const fs = require("fs/promises");
const { join } = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await asyncHandler(fs.readFile(contactsPath));
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await asyncHandler(listContacts());
  const contact = contacts.find(({ id }) => id === contactId);
  return contact;
};

const addContact = async (body) => {
  const contacts = await asyncHandler(listContacts());
  const newContact = { id: uuidv4(), ...body };
  const newListContacts = [...contacts, newContact];
  await asyncHandler(
    fs.writeFile(contactsPath, JSON.stringify(newListContacts, null, 2))
  );
  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await asyncHandler(listContacts());
  const contactIdx = contacts.findIndex(({ id }) => id === contactId);

  if (contactIdx === -1) {
    return null;
  }
  const [newContacts] = contacts.splice(contactIdx, 1);
  await asyncHandler(
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  );
  return newContacts;
};

const updateContact = async (contactId, body) => {
  const contacts = await asyncHandler(listContacts());
  const contactIdx = contacts.findIndex(({ id }) => id === contactId);
  if (contactIdx === -1) {
    return null;
  }
  contacts[contactIdx] = { id: contactId, ...body };
  await asyncHandler(
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  );
  return contacts[contactIdx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
