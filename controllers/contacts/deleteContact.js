const { Contact } = require("../../models/contact");
const { isValidObjectId } = require("mongoose");
const createError = require("../../helpers/createError");

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const isValid = isValidObjectId(contactId);
  if (!isValid) {
    throw createError(404, "Not valid id");
  }
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw createError(404, "Not found");
  }
  res.json({ message: "contact delete" });
};

module.exports = deleteContact;
