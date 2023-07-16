const { Contact } = require("../../models/contact.js");
const { HttpError, ctrlWrapper } = require("../../helpers/index.js");

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Contact deleted",
  });
};

module.exports = {
  removeContact: ctrlWrapper(removeContact),
};
