const fs = require("fs/promises");
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
  const stringContacts = JSON.stringify(removeById);
};

// const addContact = async (body) => {};

// const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  // removeContact,
  // addContact,
  // updateContact,
};
