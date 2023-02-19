const { Contact } = require("../db/contactModel");
const { RequestError } = require("../helpers/requestError");

const removeContactService = async (contactId, owner) => {
  const data = await Contact.findOneAndRemove({ _id: contactId, owner: owner });

  if (!data) {
    throw RequestError(404, `id:${contactId} not found`);
  }
  console.log(data);
  return data;
};
module.exports = { removeContactService };
