const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile("contacts.json");
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId.toString());

  if (idx === -1) return null;
  const [res] = contacts.splice(idx, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return res;
};

const addContact = async (data) => {
  const { name, email, phone } = data;
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };

  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
