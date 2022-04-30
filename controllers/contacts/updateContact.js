const { Contact, schemas } = require("../../models/contact");
const { isValidObjectId } = require("mongoose");
const createError = require("../../helpers/createError");

const updateContact = async (req, res, next) => {
  const { error } = schemas.updateFavorite.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }
  const { contactId } = req.params;
  const isValid = isValidObjectId(contactId);
  if (isValid) {
    throw createError(404, "Not valid id");
  }
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw createError(404, "Not found");
  }
  res.json(result);
};

module.exports = updateContact;
