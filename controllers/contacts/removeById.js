const createError = require("../../helpers/createError");
const { removeContact } = require("../../models/contactsModel");

const removeById = async (req, res) => {
  const id = req.params.contactId;
  const contact = await removeContact(id);
  if (!contact) {
    throw createError(404, "Not found");
  }
  res.status(200).json({ message: "Contact deleted" });
};

module.exports = removeById;
