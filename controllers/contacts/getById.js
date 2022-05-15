const { Contact } = require("../../models/contact");
const { isValidObjectId } = require("mongoose");
const { createError } = require("../../helpers");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const isValid = isValidObjectId(contactId);
  if (!isValid) {
    throw createError(404);
  }
  const result = await Contact.findById(contactId);

  if (!result) {
    throw createError(404, "Not found");
  }
  res.json(result);
};

module.exports = getById;
