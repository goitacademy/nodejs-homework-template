const { isValidObjectId } = require("mongoose");
const { Contact, schemas } = require("../../models/contact");
const { createError } = require("../../helpers");

const updateFavorite = async (req, res) => {
  const { error } = schemas.update.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }
  const { contactId } = req.params;
  const isValid = isValidObjectId(contactId);
  if (!isValid) {
    throw createError(404);
  }
  const updateStatusContact = await Contact.findByIdAndUpdate(
    contactId,
    req.body,
    {
      new: true,
    }
  );
  if (!updateStatusContact) {
    throw createError(404);
  }
  res.json(updateStatusContact);
};

module.exports = updateFavorite;
