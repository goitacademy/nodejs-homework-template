const Contact = require("../contacts");
const HttpError = require("../../helpers/HttpError");

const updateStatusContact = async (contactId, body) => {
  try {
    return await Contact.findByIdAndUpdate(
      contactId,
      { $set: body },
      { new: true }
    );
  } catch (error) {
    throw new HttpError(500, "Error updating contact status in the database");
  }
};

module.exports = updateStatusContact;
