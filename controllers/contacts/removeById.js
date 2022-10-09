const { createError } = require("../../helpers");
const { Contact } = require("../../models/contactModel");

const removeById = async (req, res) => {
  const id = req.params.contactId;
  const contact = await Contact.findByIdAndDelete(id);
  if (!contact) {
    throw createError(404, "Not found");
  }
  res.status(200).json({ message: "Contact deleted" });
};

module.exports = removeById;
