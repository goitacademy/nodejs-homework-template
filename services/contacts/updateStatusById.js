const { Contact } = require("../../models");
const { WrongParametersError } = require("../../helpers");

const updateStatusById = async (contactId, favorite, userId) => {
  const contact = await Contact.findOneAndUpdate(
    {
      _id: contactId,
      owner: userId,
    },
    {
      $set: { favorite },
    },
    { returnDocument: "after" }
  );
  if (!contact) {
    throw new WrongParametersError(
      `Failure, contact with id: ${contactId} was not found`
    );
  }
  return contact;
};

module.exports = updateStatusById;
