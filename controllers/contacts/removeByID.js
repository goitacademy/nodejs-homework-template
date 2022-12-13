const contacts = require("../../models/contacts");
const createError = require("../../helpers/createError");

const removeById = async (req, res, next) => {
  const result = await contacts.removeContact(req.params.contactId);
  if (!result) {
    throw createError(404, "Contact not found");
  }
  res.status(204);
};

module.exports = removeById;
