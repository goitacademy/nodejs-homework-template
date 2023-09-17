const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");

  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  if (!contacts.some((contact) => contact.id === contactId)) {
    return null;
  }

  const contactById = contacts.filter((contact) => contact.id === contactId);

  return contactById;
};

const removeContact = async (contactId) => {
  const prevContacts = await listContacts();

  if (!prevContacts.some((contact) => contact.id === contactId)) {
    return null;
  }

  const contacts = prevContacts.filter((contact) => contact.id !== contactId);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return { message: "contact deleted" };
};

const addContact = async (body) => {
  const prevContacts = await listContacts();
  const addedContact = {
    id: nanoid(),
    ...body,
  };
  const contacts = [...prevContacts, addedContact];

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return addedContact;
};

const updateContact = async (contactId, body) => {
  const prevContacts = await listContacts();
  const contactIndex = prevContacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (contactIndex === -1) {
    return null;
  }

  const updatedContact = {
    ...prevContacts[contactIndex],
    ...body,
  };

  prevContacts[contactIndex] = updatedContact;

  await fs.writeFile(contactsPath, JSON.stringify(prevContacts, null, 2));

  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
