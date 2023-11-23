const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const allContacts = await fs.readFile(contactsPath);
  return JSON.parse(allContacts);
};

const getById = async (contactId) => {
  const allContacts = await listContacts();
  const contactByID = allContacts.find((contact) => contact.id === contactId);
  return contactByID || null;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const removedContactindex = allContacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (removedContactindex === -1) {
    return null;
  }

  const [removedContact] = allContacts.splice(removedContactindex, 1);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return removedContact;
};

const addContact = async (body) => {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const removedContactIndex = allContacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (removedContactIndex === -1) {
    return null;
  }

  allContacts[removedContactIndex] = { id: contactId, ...body };

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return allContacts[removedContactIndex];
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
