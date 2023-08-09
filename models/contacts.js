const fs = require("fs/promises");
const path = require("path");
const { randomUUID } = require("crypto");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const date = await fs.readFile(contactsPath);
  const getContacts = JSON.parse(date);

  return getContacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find(
    (contact) => String(contact.id) === String(contactId)
  );

  return contactById || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const updateContacts = contacts.filter(
    (contact) => String(contact.id) !== String(contactId)
  );

  await fs.writeFile(contactsPath, JSON.stringify(updateContacts));

  return contacts.find((contact) => String(contact.id) === String(contactId));
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();

  const body = {
    id: randomUUID(),
    name,
    email,
    phone,
  };

  contacts.push(body);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return body;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(
    (contact) => String(contact.id) === String(contactId)
  );
  if (index === -1) {
    return null;
  }

  const contactUpdate = { ...contacts[index], ...body };

  await fs.writeFile(
    contactsPath,
    JSON.stringify([...contacts, contactUpdate], null, 2)
  );
  return contactUpdate;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
