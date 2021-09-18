const getAllContacts = require("./getAllContacts");

const listContacts = async () => {
  const contacts = await getAllContacts();
  return contacts;
};

module.exports = listContacts;
