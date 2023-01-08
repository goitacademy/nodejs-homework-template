const { Contact } = require("../../db");

const getContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

module.exports = {
  getContacts,
};
