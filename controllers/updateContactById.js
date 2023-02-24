const { HttpError } = require("../helpers");

const { updateContact } = require("../models");

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await updateContact(contactId, req.body);
  if (!contact) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }
  res.json(contact);
};

module.exports = updateContactById;
