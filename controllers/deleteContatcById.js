const contacts = require("../service");
const { HttpError } = require("../helper");

const deleteContatcById = async (req, res, next) => {
  const { contactId } = req.params;
  const response = await contacts.removeContact(contactId);
  if (!response) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json({ message: "Contact deleted" });
};

module.exports = deleteContatcById;
