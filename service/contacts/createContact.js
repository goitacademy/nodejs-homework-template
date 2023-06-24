const { Contact } = require("../../models/contact.js");

const createContact = async ({ name, email, phone }) => {
  return Contact.create({ name, email, phone });
};

module.exports = {createContact};
