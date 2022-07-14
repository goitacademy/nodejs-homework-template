const { createError } = require("../../helpers");

const { Contact } = require("../../models/contacts");

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw createError(404);
  }
  res.json({
    message: "Contact deleted",
  });
};

module.exports = removeContact;
