const fs = require("fs/promises");
const { v4 } = require("uuid");
const path = require("path");
const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const oneContact = contacts.find(({ id }) => id === contactId);
  return oneContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);
  const deletedContact = contacts[index];
  if (index !== -1) {
    contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  }
  return deletedContact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const addedContact = { id: v4(), ...body };
  contacts.push(addedContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return addedContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const [contact] = contacts.filter((el) => contactId === el.id);
  if (contact) {
    contact.name = body.name;
    contact.email = body.email;
    contact.phone = body.phone;
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  }
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
