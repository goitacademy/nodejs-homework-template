const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.resolve(__dirname, "./contacts.json");
const { nanoid } = require("nanoid");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await fs.readFile(contactsPath);
  const contact = JSON.parse(contacts).filter(
    (contact) => contact.id === contactId
  );

  if (contact.length !== 0) {
    return contact;
  } else {
    return false;
  }
};

const removeContact = async (contactId) => {
  const contactsRaw = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactsRaw);
  const updatedContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));

  if (contacts.length === updatedContacts.length) {
    return false;
  } else {
    return true;
  }
};

const addContact = async (body) => {
  const id = nanoid();
  const newContact = { id, ...body };

  const contactsRaw = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactsRaw);
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return newContact;
};

const updateContact = async (contactId, body) => {
  const contactsRaw = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactsRaw);

  const index = contacts.findIndex((contact) => contact.id === contactId);
  const contact = contacts.find((contact) => contact.id === contactId);
  if (body.name) {
    contact.name = body.name;
  }
  if (body.email) {
    contact.email = body.email;
  }
  if (body.phone) {
    contact.phone = body.phone;
  }
  contacts.splice(index, 1, contact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
