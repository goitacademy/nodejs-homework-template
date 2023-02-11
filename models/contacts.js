const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "/contacts.json");

// overwrite contacts.json with new contacts
const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

// returns cotacts list
const getAll = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};
// returns contact by id
const getById = async (contactId) => {
  const allContacts = await getAll();
  const result = allContacts.find((contact) => contact.id === contactId);
  return result;
};
// delete contact by id
const deleteById = async (contactId) => {
  const allContacts = await getAll();
  const index = allContacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  allContacts.splice(index, 1);
  updateContacts(allContacts);
  return allContacts;
};
// create and add new contact with name, email and phone
const add = async ({ name, email, phone }) => {
  const allContacts = await getAll();
  const newContact = { id: nanoid(), name, email, phone };
  allContacts.push(newContact);
  updateContacts(allContacts);
  return newContact;
};
// contact update
const updateById = async (contactId, { name, email, phone }) => {
  const allContacts = await getAll();
  const index = allContacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  allContacts[index] = { id: contactId, name, email, phone };
  updateContacts(allContacts);
  return allContacts[index];
};

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
};
