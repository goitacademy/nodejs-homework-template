const { createError } = require("../../helpers");
const contacts = require("../../models/contact");

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contacts.removeContact(id);
  if (!result) {
    throw createError(404);
  }
  res.json({
    message: "Contact deleted",
  });
};

module.exports = removeContact;
