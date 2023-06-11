const createError = require("http-errors");
const contacts = require("../../models/contacts");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const removeContactId = await contacts.removeContact(contactId);

  if (!removeContactId) {
    throw createError(404, "Not found");
  }

  res.json({
    message: "Delete success",
  });
};

module.exports = removeById;
