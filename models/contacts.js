const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const findContactById = allContacts.find(({ id }) => id === contactId);

  return findContactById || null;
};

const addContact = async (body) => {
  const newContact = {
    id: nanoid(),
    ...body,
  };
  const allContacts = await listContacts();
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return newContact;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }
  const [remove] = allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return remove;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }

  allContacts[index] = { id: contactId, ...body };

  fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return allContacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
