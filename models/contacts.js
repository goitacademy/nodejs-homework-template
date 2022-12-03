const { readFile, writeFile } = require("fs/promises");
const { join } = require("path");
const { v4: uuid } = require("uuid");

const pathContacts = join(__dirname, "contacts.json");

const updateContacts = async (data) => {
  await writeFile(pathContacts, JSON.stringify(data), "utf-8");
};

const getContacts = async () => {
  const data = await readFile(pathContacts, "utf-8");

  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await getContacts();
  const [contactById] = contacts.filter((cont) => cont.id === contactId);

  return contactById;
};

const addContact = async (body) => {
  const contacts = await getContacts();

  const id = uuid();
  const newContact = { id, ...body };
  contacts.push(newContact);

  await updateContacts(contacts);

  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await getContacts();

  const contactIndex = contacts.findIndex((cont) => cont.id === contactId);
  if (contactIndex === -1) return null;

  const contactDeleted = contacts.splice(contactIndex, 1);
  await updateContacts(contacts);

  return contactDeleted;
};

const updateContact = async (contactId, body) => {
  const contacts = await getContacts();

  const contactIndex = contacts.findIndex((cont) => cont.id === contactId);
  if (contactIndex === -1) return null;

  const contactUpdated = { contactId, ...body };
  contacts.splice(contactIndex, 1, contactUpdated);

  await updateContacts(contacts);

  return contactUpdated;
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
