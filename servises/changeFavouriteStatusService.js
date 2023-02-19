const { Contact } = require("../db/contactModel");
const { RequestError } = require("../helpers/requestError");

const changeFavouriteStatusService = async (contactId, favorite, owner) => {
  const data = await Contact.findOneAndUpdate(
    { _id: contactId, owner: owner },
    { $set: { favorite } }
  );

  if (!data) {
    throw RequestError(404, `id:${contactId} not found`);
  }

  return data;
};
module.exports = { changeFavouriteStatusService };
