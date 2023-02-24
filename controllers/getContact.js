const HttpError = require("../helpers");

const { getContactById } = require("../models");

const getContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    throw HttpError(404, `Contact with id=${contactId} was not found`);
  }
  res.json(contact);
};

module.exports = getContact;
