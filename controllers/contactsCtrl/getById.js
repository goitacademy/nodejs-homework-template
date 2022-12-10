const contacts = require("../../models/contactsModels");

const { HttpError } = require("../../helpers");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);

  if (!result) {
    throw HttpError(404, "Pages Not Found");
  }

  res.json(result);
};

module.exports = getById;
