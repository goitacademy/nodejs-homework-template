const contacts = require("../service");
const { HttpError } = require("../helper");

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;
  const response = await contacts.updateContact(contactId, body);
  if (!response) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(response);
};

module.exports = updateContact;
