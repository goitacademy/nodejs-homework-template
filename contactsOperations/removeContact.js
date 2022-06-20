const { Contact } = require("../models/index");

const removeContact = async (id) => {
  const remove = Contact.findByIdAndDelete(id);

  return remove;
};

module.exports = removeContact;
