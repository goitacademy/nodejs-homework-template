const { RequestError } = require("../helpers/requestError");
const { Contact } = require("../db/contactModel");

const getContactByIdService = async (contactId, owner) => {
  const data = await Contact.findById(contactId);

  if (!data) {
    throw RequestError(404, `id:${contactId} not found`);
  }

  if (data.owner !== owner) {
    throw RequestError(404, "Bad request");
  }
  return data;
};
module.exports = { getContactByIdService };
