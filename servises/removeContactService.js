const { Contact } = require("../db/contactModel");
const { RequestError } = require("../helpers/requestError");

const removeContactService = async (contactId) => {
  const data = await Contact.findByIdAndRemove(contactId);

  if (!data) {
    throw RequestError(404, `id:${contactId} not found`);
  }
  console.log(data);
  return data;
};
module.exports = { removeContactService };
