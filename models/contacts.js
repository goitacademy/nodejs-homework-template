const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

const updateContacts = async (allContacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};
const getContactById = async ({ contactId }) => {
  const allContacts = await listContacts();
  const contact = allContacts.find(({ id }) => id === contactId);
  return contact || null;
};

const addContact = async (name, email, phone) => {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  updateContacts(allContacts);
  return newContact;
};

const removeContact = async ({ contactId }) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(({ id }) => id === contactId);
  if (index === -1) return null;
  const [result] = allContacts.splice(index, 1);
  updateContacts(allContacts);
  return result;
};

const updateContact = async ({ contactId }, body) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(({ id }) => id === contactId);
  if (index === -1) return null;
  allContacts[index] = { ...allContacts[index], ...body };
  updateContacts(allContacts);
  return allContacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
