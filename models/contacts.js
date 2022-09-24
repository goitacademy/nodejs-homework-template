const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const allContacts = await fs.readFile(contactPath);
  return JSON.parse(allContacts);
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const result = allContacts.find((contact) => contact.id === contactId);

  return result || null;
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {
  const allContacts = await listContacts();

  const newContact = {
    id: nanoid(10),
    ...body,
  };

  allContacts.push(newContact);

  await fs.writeFile(contactPath, JSON.stringify(allContacts, null, 2));

  return newContact;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
