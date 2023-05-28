const fs = require("fs/promises");
const path = require("path");
const contactPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const bufer = await fs.readFile(contactPath);
  return JSON.parse(bufer);
};

// const getContactById = async (contactId) => {};

// const removeContact = async (contactId) => {};

// const addContact = async (body) => {};

// const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  // getContactById,
  // removeContact,
  // addContact,
  // updateContact,
};
