const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
const contactPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const bufer = await fs.readFile(contactPath);
  return JSON.parse(bufer);
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contactById = await allContacts.find((item) => item.id === contactId);
  return contactById;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const removeById = await allContacts.filter((item) => item.id !== contactId);
  const stringContacts = await JSON.stringify(removeById, null, 2);
  fs.writeFile(contactPath, stringContacts);
  return removeById || null;
};

const addContact = async (body) => {
  body.id = nanoid();
  const allContacts = await listContacts();
  allContacts.push(body);
  const stringContacts = await JSON.stringify(allContacts, null, 2);
  fs.writeFile(contactPath, stringContacts);
  return body;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }

  allContacts[index] = { id: contactId, ...body };
  const stringContacts = await JSON.stringify(allContacts, null, 2);
  fs.writeFile(contactPath, stringContacts);
  return allContacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
