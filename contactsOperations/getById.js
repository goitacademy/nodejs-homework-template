const { Contact } = require("../models/index");

const getById = async (id) => {
  const contact = Contact.findById(id);

  return contact;
};

module.exports = getById;
