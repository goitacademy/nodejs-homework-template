const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "contacts.json");

const readContacts = async () => {
  const contactsRaw = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(contactsRaw);
  return contacts;
};

const writeContacts = async (contacts) => {
  return await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const contacts = await readContacts();
  return contacts;
};

const getContactById = async (contactId, res) => {
  const contacts = await readContacts();
  const contactById = contacts.find((contact) => contact.id == contactId);
  return contactById;
};

const removeContact = async (contactId) => {
  const contacts = await readContacts();
  const result = contacts.filter((contact) => contact.id !== contactId);
  if (contacts.length === result) {
    return false;
  }
  await writeContacts(result);
  return true;
};

const addContact = async (body) => {
  const id = nanoid();
  // const { name, email, phone } = body;
  const contacts = await readContacts();
  const newContact = { id, ...body };
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
};

// const updateContact = async (contactId, body, res) => {
//   // const { name, email, phone } = body;
//   const contacts = await readContacts();
//   const updateContacts = contacts.find((contact) => contact.id === contactId);
//   await writeContacts(updateContacts, body);
// };

const updateContact = async (contactId, body, res) => {
  // const { name, email, phone } = body;
  const contacts = await readContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return false;
  }
  contacts.splice(index, 1, { id: contactId, ...body });
  await writeContacts(contacts);
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
