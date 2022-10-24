const { Contact } = require("../../models");
const { RequestError } = require("../../helpers");

const removeContact = async (contactId, userId) => {
  const contact = await Contact.findOneAndDelete({
    _id: contactId,
    owner: userId,
  });
  if (!contact) {
    throw RequestError(
      404,
      `Failure, contact with id: ${contactId} was not found`
    );
  }
  return contact;
};


module.exports = removeContact;