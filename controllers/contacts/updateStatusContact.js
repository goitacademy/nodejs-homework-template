const { Contact } = require("../../models");
const { HttpError, ctrlWrapper } = require("../../helpers");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw HttpError(400, "Contact not found");
  }
};

module.exports = {
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
