const { Types } = require("mongoose");
const { Contact } = require("../../models/contact.js");

const removeContact = async (contactId) => {
  if (!Types.ObjectId.isValid(contactId)) {
    return null;
  }
  return Contact.findByIdAndRemove({ _id: contactId });
};

module.exports = {removeContact};
