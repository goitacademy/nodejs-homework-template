const createError = require("../helpers/createError");
const { removeContact } = require("../models/contacts");

const removeById = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await removeContact(contactId);
  if (!result) {
    throw createError(404);
  }

  res.json({ message: "contact deleted" });
};

module.exports = removeById;
