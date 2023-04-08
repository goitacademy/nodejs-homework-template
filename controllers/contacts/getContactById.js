const HttpError = require("../../helpers");
const contactsOperation = require("../../models/contacts");

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsOperation.getContactById(contactId);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

module.exports = getContactById;
