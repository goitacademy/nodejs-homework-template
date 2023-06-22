const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/contacts.json");
console.log(contactsPath);

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
};

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), ...data };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const removeContact = async (conactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === conactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const contact = await allContacts.find((item) => item.id === contactId);
  if (!contact) return null;
  const updateContact = { ...contact, ...body };
  const updateContacts = await allContacts.map((item) => {
    if (item.id === contactId) return updateContact;
    return item;
  });
  await fs.writeFile(contactsPath, JSON.stringify(updateContacts));
  return updateContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
