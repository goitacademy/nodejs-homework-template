const { Contact, updateFavoriteSchema } = require("../../models");
const { createError } = require("../../helpers");

const updateContactStatus = async (req, res) => {
  const { error } = updateFavoriteSchema.validate(req.body);
  if (error) {
    throw createError(400, (error.message = "missing field favorite"));
  }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = updateContactStatus;
