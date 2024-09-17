const { HttpError, ctrlWrapper } = require("../../helpers/index");
const contactSchema = require("../../models/contactSchema");
const removeByIdContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactSchema.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "contact deleted",
  });
};

module.exports = { removeByIdContact: ctrlWrapper(removeByIdContact) };
