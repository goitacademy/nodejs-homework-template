const { Contact } = require("../../models");
const { WrongParametersError } = require("../../helpers");

const updateById = async (contactId, body, userId) => {
  const contact = await Contact.findOneAndUpdate(
    {
      _id: contactId,
      owner: userId,
    },
    {
      $set: { ...body },
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

module.exports = updateById;
