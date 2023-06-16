const { Contact } = require("../../models");
const { ctrlWrapper } = require("../../helpers");
const { HttpError } = require("../../helpers");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(400, "Not found");
  }

  res.status(200).json({ message: "contact deleted" });
};

module.exports = {
  removeContact: ctrlWrapper(removeContact),
};
