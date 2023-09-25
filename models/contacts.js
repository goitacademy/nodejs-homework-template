const fs = require("fs/promises");
const path = require("path");

const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const id = String(contactId);
  const contacts = await listContacts();

  const result = contacts.find((item) => item.id === id);
  return result || null;
};

const removeContact = async (contactId) => {
  const id = String(contactId);
  const contacts = await listContacts();

  const index = contacts.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();

  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contactsList = await listContacts();

  const contactIndex = contactsList.findIndex(
    (contact) => contact.id === contactId
  );

  if (contactIndex === -1) {
    return null;
  }

  contactsList.splice(contactIndex, 1, {
    ...contactsList[contactIndex],
    ...body,
  });

  fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return contactsList[contactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
