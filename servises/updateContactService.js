const { Contact } = require("../db/contactModel");
const { RequestError } = require("../helpers/requestError");

const updateContactService = async (contactId, name, email, phone) => {
  const data = await Contact.findByIdAndUpdate(contactId, {
    $set: { name, email, phone },
  });

  if (!data) {
    throw RequestError(404, `id:${contactId} not found`);
  }

  return data;
};
module.exports = { updateContactService };
