const fs = require("fs/promises");
const path = require("path");
const ObjectID = require("bson-objectid");
const contactsPath = path.join(__dirname, "contacts.json");

const update = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === contactId);

  if (!contact) {
    return null;
  }

  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);

  if (idx === -1) {
    return null;
  }

  const [removeContact] = contacts.splice(idx, 1);
  update(contacts);

  return removeContact;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: ObjectID(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  update(contacts);

  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);

  if (idx === -1) {
    return null;
  }

  contacts[idx] = { ...contacts[idx], ...body };
  update(contacts);

  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
