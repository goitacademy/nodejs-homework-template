const { Types } = require("mongoose");
const { Contact } = require("../../models/contact.js");

const updateContact = async (contactId, body) => {
  if (!Types.ObjectId.isValid(contactId)) {
    return null;
  }
  return Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true });
};

module.exports = {updateContact};
