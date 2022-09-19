const { Contact } = require("../../models");
const { WrongParametersError } = require("../../helpers");

const getById = async (contactId, userId) => {
  const contact = await Contact.findOne({ _id: contactId, owner: userId });
  if (!contact) {
    throw new WrongParametersError(
      `Failure, contact with id: ${contactId} was not found`
    );
  }
  return contact;
};

module.exports = getById;
