const path = require("path");
const readContacts = require("./readContacts");

const contactsPath = path.join(__dirname, "./contacts.json");

const getContactById = async (contactId) => {
  const contacts = await readContacts(contactsPath);
  return contacts.find((contact) => contact.id === contactId);
};

module.exports = { getContactById };
