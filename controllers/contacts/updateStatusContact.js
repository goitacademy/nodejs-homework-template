const { ctrlWrapper } = require("../utils");

const { HttpError } = require("../helpers");

const { Contact } = require("../models");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }
  res.json(result);
};

module.exports = updateStatusContact;
