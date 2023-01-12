const { Contact } = require("../../db");

const removeContact = async (id, userId) => {
  return await Contact.findOneAndRemove({ _id: id, owner: userId });
};

module.exports = {
  removeContact,
};
