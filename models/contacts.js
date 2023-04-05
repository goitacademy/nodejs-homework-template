const fs = require("fs/promises");
const path = require("path");

const { nanoid } = require("nanoid");

const contactPath = path.resolve("models", "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  const contact = contacts.find((contact) => contact.id === contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);

  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));

  return result;
};

const addContact = async (body) => {
  const contacts = await listContacts();

  const contact = {
    id: nanoid(),
    name: body.name,
    email: body.email,
    phone: body.phone,
  };

  contacts.push(contact);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));

  return contact;
};
const updateContact = async (contactId, body) => {
  const contacts = await listContacts();

  const index = contacts.findIndex((item) => item.id === contactId);

  if (index === -1) {
    return null;
  }

  const updateContact = {
    ...contacts[index],
    ...body,
  };

  contacts.splice(index, 1, updateContact);

  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));

  return updateContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
