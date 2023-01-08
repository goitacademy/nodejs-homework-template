const { Contact } = require("../../db");

const removeContact = async (id) => {
  return await Contact.findByIdAndRemove(id);
};

module.exports = {
  removeContact,
};
