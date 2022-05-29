const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");
console.log(contactsPath);

const listContacts = async () => {
  const contactsString = await fs.readFile(contactsPath);
  return JSON.parse(contactsString);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const foundContact = contacts.find((contact) => contact.id === contactId);

  return foundContact || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactToRemove = contacts.find((contact) => contact.id === contactId);
  const updatedContacts = contacts.filter((contact) => {
    return contact.id !== contactId;
  });

  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  return contactToRemove;
};

const addContact = async (body) => {
  const newContact = {
    ...body,
    id: nanoid(),
  };
  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }

  contacts[index] = { ...body, id };

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
