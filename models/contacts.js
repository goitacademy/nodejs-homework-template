const fs = require("fs/promises");
const shortId = require("shortid");
const path = require("path");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const rezult = await fs.readFile(contactsPath);
  const listContacts = JSON.parse(rezult);
  return listContacts;
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const rezult = contacts.find((item) => item.id === id);
  if (!rezult) {
    return null;
  }
  return rezult;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);

  if (idx === -1) {
    return null;
  }

  const delContact = contacts[idx];
  contacts.splice(idx, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return delContact;
};

const addContact = async (body) => {
  const data = { id: shortId.generate(), ...body };
  const contacts = await listContacts();
  contacts.push(data);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return data;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);

  if (idx === -1) {
    return null;
  }
  const updateContact = { id: contactId, ...body };

  contacts.splice(idx, 1, updateContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return updateContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
