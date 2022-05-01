const { Contact } = require("../../models/contact");
const createError = require("../../helpers/createError");

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw createError(404, "Not found");
  }
  res.json({ message: "Contact delete" });
};

module.exports = deleteContact;
