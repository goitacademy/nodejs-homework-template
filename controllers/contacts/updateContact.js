const contactsOperation = require("../../models/contacts");

const { HttpError } = require("../../helpers");

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsOperation.updateContact(id, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

module.exports = updateContact;
