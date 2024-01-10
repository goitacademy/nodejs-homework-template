const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const filePath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(filePath, { encoding: "utf-8" });
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIndex === -1) {
    return null;
  }
  contacts.splice(contactIndex, 1);
  await fs.writeFile(filePath, JSON.stringify(contacts, undefined, 2));
  return contacts;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const { name, email, phone } = body;

  const newContact = {
    id: crypto.randomUUID(),
    name: name,
    email: email,
    phone: phone,
  };

  contacts.push(newContact);
  await fs.writeFile(filePath, JSON.stringify(contacts, undefined, 2));

  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (contactIndex === -1) {
    return null;
  }

  contacts[contactIndex] = { id: contactId, ...body };

  await fs.writeFile(filePath, JSON.stringify(contacts, undefined, 2));

  return contacts[contactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
