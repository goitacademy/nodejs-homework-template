const { Contact } = require("../../models/contact");
const { HttpError, ctrlWrapper } = require("../../helpers");

const removeContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Delete success",
  });
  // res.status(204).send()
};

module.exports = ctrlWrapper(removeContactById);
