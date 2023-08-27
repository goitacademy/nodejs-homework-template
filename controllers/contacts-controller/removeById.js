const { Contact } = require("../../models/contacts");
const createError = require("http-errors");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw createError(404, `Contact with id=${contactId} not found`);
  }
  res.json({
    message: "contact deleted",
  });
};

module.exports = removeById;
