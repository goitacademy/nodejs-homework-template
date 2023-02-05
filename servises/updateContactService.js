const { Contact } = require("../db/contactModel");
const { RequestError } = require("../helpers/requestError");

const updateContactService = async (
  contactId,
  name,
  email,
  phone,
  favorite
) => {
  const data = await Contact.findByIdAndUpdate(contactId, {
    $set: { name, email, phone, favorite },
  });

  if (!data) {
    throw RequestError(404, `id:${contactId} not found`);
  }

  const updatedContact = await Contact.findById(contactId);

  return updatedContact;
};
module.exports = { updateContactService };
