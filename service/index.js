const Contact = require("./schemas/contact.schema");

const getAllContacts = async () => {
  return Contact.find();
};

module.exports = {
  getAllContacts,
};
