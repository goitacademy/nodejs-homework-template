const createError = require("http-errors");

const { Contact } = require("../../models");

const removeById = async (req, res) => {
  const { contactId } = req.params;

  const removeContactId = await Contact.findByIdAndRemove(contactId);

  if (!removeContactId) {
    throw createError(404, "Not found");
  }

  res.json({
    message: "Delete success",
  });
};

module.exports = removeById;
