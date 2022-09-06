const fs = require("fs/promises");
const path = require("path");
const { randomUUID } = require("crypto");
const { ValidationError, WrongParametersError } = require("../helpers/errors");

const contactPath = path.join(__dirname, "contacts.json");

const rewriteListContacts = async (contacts) => {
  await fs.writeFile(contactPath, JSON.stringify(contacts), "utf8");
};

const listContacts = async () => {
  return JSON.parse(await fs.readFile(contactPath));
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const requiredContact = contacts.find((contact) => contact.id === contactId);

  if (!requiredContact) {
    throw new WrongParametersError("Not found");
  }
  return requiredContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    throw new WrongParametersError("Not found");
  }
  contacts.splice(index, 1);
  await rewriteListContacts(contacts);
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: randomUUID(), ...body };
  contacts.push(newContact);

  await rewriteListContacts(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  if (Object.keys(body).length === 0) {
    throw new ValidationError("missing fields");
  }
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    throw new WrongParametersError("Not found");
  }
  contacts[index] = { ...contacts[index], ...body };
  await rewriteListContacts(contacts);
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
