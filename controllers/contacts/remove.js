const { Contact } = require("../../models");
const { HttpError, ctrlWrapper } = require("../../helpers");

const remove = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await Contact.findByIdAndRemove(contactId);
  if (!deletedContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ code: 200, message: "Contact removed" });
};

module.exports = ctrlWrapper(remove);
