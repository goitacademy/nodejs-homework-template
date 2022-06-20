const { Contact } = require("../models");

const updateContact = async (id, body) => {
  const contact = Contact.findByIdAndUpdate(id, body, { new: true });

  return contact;
};

module.exports = updateContact;
