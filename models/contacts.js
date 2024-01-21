const fs = require("node:fs/promises");
const { v4: uuidv4 } = require("uuid");
const path = require("node:path");

const contactPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const findedContact = contacts.find((contact) => contact.id === contactId);
  return findedContact || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIndex === -1) {
    return null;
  }
  const [result] = contacts.splice(contactIndex, 1);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContact = async (body) => {
  const id = uuidv4().split("-").join("");
  const contacts = await listContacts();
  const newContact = {
    id,
    ...body,
  };
  contacts.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((item) => item.id === contactId);
  console.log(contactIndex);
  if (contactIndex === -1) {
    return null;
  }
  const oldContact = await getContactById(contactId);
  contacts[contactIndex] = { ...oldContact, ...body };
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return contacts[contactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
