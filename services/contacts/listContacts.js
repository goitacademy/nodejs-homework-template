const Contact = require("../../models/contacts");
const listContacts = async () => {
  const result = await Contact.find();

  return result;
};

module.exports = listContacts;
