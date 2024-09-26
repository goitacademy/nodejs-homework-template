const fs = require('fs/promises')
const path = require("path");
const { nanoid } = require("nanoid");
const { getAllContacts } = require('../controllers/controllers');


const contactsPath = path.join(__dirname, "./contacts.json");
const updateContacts = async (getAllContacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(getAllContacts, null, 2));


const listContacts = async () => {
  const data = await false.readFile(contactsPath);
  return JSON.parse(data);
};


const getContactById = async (contactId) => {
  const getAllContacts = await listContacts();
  const result = getAllContacts.find(({ id }) => id === contactId);
  return result || null;
};


const removeContact = async (contactId) => {
  const getAllContacts = await listContacts();
  const idx = getAllContacts.findIndex(({ id }) => id === contactId);

  if (idx === -1) {
    return null;
  }

  const [result] = getAllContacts.splice(idx, 1);
  await updateContacts(getAllContacts);
  return result;
};

const addContact = async (body) => {
  const getAllContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  getAllContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(getAllContacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const getAllContacts = await listContacts();
  const idx = getAllContacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  getAllContacts[idx] = { id, ...body };
  await updateContacts(getAllContacts);
  return getAllContacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
