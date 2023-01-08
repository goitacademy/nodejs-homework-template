const { Contact } = require("../../db");

const addContact = async (body) => {
  const contact = new Contact({ ...body });
  contact.save();
  return contact;
};

module.exports = {
  addContact,
};
