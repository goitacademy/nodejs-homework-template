const { Contact } = require("../../models");
const { HttpError, ctrlWrapper } = require("../../helpers");

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.json({
    message: "Contact deleted",
  });
};

module.exports = {
  deleteById: ctrlWrapper(deleteById),
};
