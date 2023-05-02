const fs = require("fs/promises");
const path = require("path");
const filePath = path.join(__dirname, "./contacts.json");
const { nanoid } = require("nanoid");

const updateContacts = async (contacts) => {
  await fs.writeFile(filePath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const data = await fs.readFile(filePath);
  return JSON.parse(data);
};
const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contact = allContacts.find((t) => t.id === contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((t) => t.id === contactId);
  if (index === -1) {
    return null;
  }
  const result = allContacts.splice(index, 1);
  await updateContacts(result);
  return result;
};

const addContact = async (body) => {
  const allContacts = await listContacts();
  const newContact = { id: nanoid(), ...body };
  const newArr = [...allContacts, newContact];
  updateContacts(newArr);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((t) => t.id === contactId);
  if (index === -1) {
    return null;
  }
  let contact = allContacts[index];
  contact = { ...contact, ...body };
  const result = (allContacts[index] = contact);
  await updateContacts(allContacts);
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
