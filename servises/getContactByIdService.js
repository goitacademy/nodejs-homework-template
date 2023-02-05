const { RequestError } = require("../helpers/requestError");
const { Contact } = require("../db/contactModel");

const getContactByIdService = async (contactId) => {
  const data = await Contact.findById(contactId);
  if (!data) {
    throw RequestError(404, `id:${contactId} not found`);
  }
  return data;
};
module.exports = { getContactByIdService };
