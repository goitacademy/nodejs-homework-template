const { Contact } = require("../db/contactModel");
const { RequestError } = require("../helpers/requestError");

const changeFavouriteStatusService = async (contactId, favorite) => {
  const data = await Contact.findByIdAndUpdate(contactId, {
    $set: { favorite },
  });

  if (!data) {
    throw RequestError(404, `id:${contactId} not found`);
  }

  return data;
};
module.exports = { changeFavouriteStatusService };
