const contacts = require("../../models/contactsModels");

const { HttpError } = require("../../helpers");

const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.deleteContact(contactId);

  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json({
    message: "Delete success",
  });
};

module.exports = removeById;
