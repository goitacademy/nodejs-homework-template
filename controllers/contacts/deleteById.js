const { Contact } = require("../../models/contacts");
const { HttpError } = require("../../utils");

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;

  const deletedContact = await Contact.findByIdAndRemove(contactId);
  if (!deletedContact) {
    throw HttpError(404, "Not found contact");
  }
  res.status(200).json({ message: "contact deleted" });
};
module.exports = deleteById;
