const { contact } = require("../models");
const { ContactModel } = contact;

const remove = async (contactId) => {
  const data = await ContactModel.findByIdAndDelete(contactId);
  return data;
};

module.exports = remove;
