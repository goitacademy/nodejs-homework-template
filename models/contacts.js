const fs = require("fs/promises");

const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf8").then(JSON.parse);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find(({ id }) => id === contactId);
  return result;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const updContacts = contacts.filter(({ id }) => id !== contactId);
  return await fs.writeFile(
    contactsPath,
    JSON.stringify(updContacts, null, 2),
    "utf8"
  );
};

const addContact = async (body) => {
  const contacts = await listContacts();
  contacts.push(body);
  return await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts, null, 2),
    "utf8"
  );
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const findContact = contacts.find(({ id }) => id === contactId);
  const everyoneElse = contacts.filter(({ id }) => id !== contactId);

  const updContact = { ...findContact, ...body };
  const allContactsUpd = [...everyoneElse, updContact];

  await fs.writeFile(
    contactsPath,
    JSON.stringify(allContactsUpd, null, 2),
    "utf8"
  );
  return updContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};