const Contact = require("../models/contacts");

const listContacts = async (query, user) => {
  const result = await Contact.find({ owner: user.id });
  return result;
};

module.exports = {
  listContacts,
};
