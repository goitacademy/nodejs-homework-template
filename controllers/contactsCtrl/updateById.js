const contacts = require("../../models/contactsModels");

const { HttpError } = require("../../helpers");

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.updateContactById(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not Found");
  }

  res.json(result);
};

module.exports = updateById;
