const path = require("path");
const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("models/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (id) => {
  const data = await listContacts();
  const contact = data.filter((contact) => contact.id === id);
  if (contact.length === 0) {
    return null;
  }
  return contact;
};

const addContact = async (body) => {
  const { name, email, phone } = body;

  const newContact = {
    id: await uuidv4(),
    name,
    email,
    phone,
  };

  const sourceContacts = await listContacts();
  const newContacts = [...sourceContacts, newContact];

  await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf8");
  return newContact;
};

const updateContact = async (id, body) => {
  const sourceContacts = await listContacts();
  let contactToUpdate = sourceContacts.filter(
    (contact) => contact.id === String(id)
  );

  if (contactToUpdate.length === 0) {
    return null;
  }

  contactToUpdate = { id, ...body };

  const сontactsToUpdate = sourceContacts.filter(
    (contact) => contact.id !== String(id)
  );

  const newContacts = [...сontactsToUpdate, contactToUpdate];

  await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf8");

  return contactToUpdate;
};

const removeContact = async (id) => {
  const sourceContacts = await listContacts();
  const newContacts = sourceContacts.filter(
    (contact) => contact.id !== String(id)
  );

  if (newContacts.length === sourceContacts.length) {
    return null;
  }

  await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf8");
  return sourceContacts.filter((contact) => contact.id === String(id));
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
