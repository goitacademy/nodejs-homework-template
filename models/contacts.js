const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactById = String(contactId);
    const contacts = await listContacts();
    const result = contacts.find((contact) => contact.id === contactById);
    return result || null;
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  const contactById = String(contactId);
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactById);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContact = async (body) => {
  const contacts = await listContacts();

  const addNewContact = {
    id: nanoid(),
    ...body,
  };
  contacts.push(addNewContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return addNewContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }
  contacts[index] = { id: contactId, ...body };

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
