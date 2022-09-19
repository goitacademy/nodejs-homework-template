const { Contact } = require("../../models");
const { WrongParametersError } = require("../../helpers");

const deleteById = async (contactId, userId) => {
  const contact = await Contact.findOneAndDelete({
    _id: contactId,
    owner: userId,
  });
  if (!contact) {
    throw new WrongParametersError(
      `Failure, contact with id: ${contactId} was not found`
    );
  }
  return contact;
};

module.exports = deleteById;
