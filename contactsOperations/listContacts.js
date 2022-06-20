const { Contact } = require("../models");
const listContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

module.exports = listContacts;
