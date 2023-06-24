const { Types } = require("mongoose");
const { Contact } = require("../../models/contact.js");

const getContactById = async (contactId) => {
  if (!Types.ObjectId.isValid(contactId)) {
    return null;
  }
  return Contact.findById(contactId);
};

module.exports = {getContactById};