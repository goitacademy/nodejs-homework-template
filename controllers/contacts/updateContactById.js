const contactsOperations = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const updateContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsOperations.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

module.exports = updateContactById;
