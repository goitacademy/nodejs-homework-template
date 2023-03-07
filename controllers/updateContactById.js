const { HttpError } = require("../helpers");

// const { updateContact } = require("../models");
const { Contact } = require("../models/contact");

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact(contactId, req.body);
  if (!contact) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }
  res.json(contact);
};

module.exports = updateContactById;
