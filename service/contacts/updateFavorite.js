const { Types } = require("mongoose");
const { Contact } = require("../../models/contact.js");

const updateFavorite = async (contactId, favorite) => {
  if (!Types.ObjectId.isValid(contactId)) {
    return null;
  }
  return Contact.findByIdAndUpdate(
    { _id: contactId },
    { favorite },
    { new: true }
  );
};

module.exports = {updateFavorite};
