const { Contact } = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json({ message: "Contact deleted" });
};

module.exports = {
  deleteContact: ctrlWrapper(deleteContact),
};
