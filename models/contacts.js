const fs = require("fs/promises");
const path = require("path");

const contactPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((c) => c.id === contactId);
  if (contacts[contactIndex]?.id) {
    return contacts[contactIndex];
  } else {
    return null;
  }
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const indexOfContact = contacts.findIndex((c) => c.id === contactId);
  if (contacts[indexOfContact]?.id) {
    contacts.splice(indexOfContact, 1);
    await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
    return contacts;
  } else {
    return null;
  }
};

const addContact = async ({ name, email, phone }) => {
  const { nanoid } = await import("nanoid");
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
  const contactIdToUpdate = contacts.findIndex((c) => c.id === contactId);
  if (contacts[contactIdToUpdate]?.id) {
    const contactUpdated = { ...contacts[contactIdToUpdate], ...body };
    contacts[contactIdToUpdate] = contactUpdated;
    await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
    return contactUpdated;
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
