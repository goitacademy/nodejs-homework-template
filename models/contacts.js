const fs = require("fs/promises");
const path = require("path");
const { nanoid } = import("nanoid");

const contactPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((c) => c.id === contactId);
  if (contact) {
    return contact;
  } else {
    return null;
  }
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((c) => c.id === contactId);
  if (contact) {
    const [result] = contacts.splice(contact, 1);
    await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
    return result;
  } else {
    return null;
  }
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contact = contacts.find((c) => c.id === contactId);
  if (contact) {
    const [result] = { contactId, ...body };
    await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
    return contacts[result];
  } else {
    return null;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
